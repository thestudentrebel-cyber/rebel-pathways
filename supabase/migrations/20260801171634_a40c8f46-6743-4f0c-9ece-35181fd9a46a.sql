CREATE OR REPLACE FUNCTION public.submit_enquiry(
  p_full_name text,
  p_company_name text,
  p_email text,
  p_phone text DEFAULT NULL,
  p_website text DEFAULT NULL,
  p_service_required text DEFAULT NULL,
  p_business_description text DEFAULT NULL,
  p_requirement text DEFAULT NULL
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_id uuid;
  v_full_name text := btrim(p_full_name);
  v_company_name text := btrim(p_company_name);
  v_email text := lower(btrim(p_email));
BEGIN
  IF v_full_name = '' OR length(v_full_name) > 120 THEN
    RAISE EXCEPTION 'Invalid full name';
  END IF;
  IF v_company_name = '' OR length(v_company_name) > 160 THEN
    RAISE EXCEPTION 'Invalid company name';
  END IF;
  IF v_email = '' OR length(v_email) > 200 OR v_email !~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$' THEN
    RAISE EXCEPTION 'Invalid email address';
  END IF;
  IF length(coalesce(p_phone, '')) > 50
    OR length(coalesce(p_website, '')) > 200
    OR length(coalesce(p_service_required, '')) > 80
    OR length(coalesce(p_business_description, '')) > 2000
    OR length(coalesce(p_requirement, '')) > 4000 THEN
    RAISE EXCEPTION 'One or more fields are too long';
  END IF;

  INSERT INTO public.enquiries (
    full_name,
    company_name,
    email,
    phone,
    website,
    service_required,
    business_description,
    requirement
  ) VALUES (
    v_full_name,
    v_company_name,
    v_email,
    nullif(btrim(coalesce(p_phone, '')), ''),
    nullif(btrim(coalesce(p_website, '')), ''),
    nullif(btrim(coalesce(p_service_required, '')), ''),
    nullif(btrim(coalesce(p_business_description, '')), ''),
    nullif(btrim(coalesce(p_requirement, '')), '')
  )
  RETURNING id INTO v_id;

  RETURN v_id;
END;
$$;

REVOKE ALL ON FUNCTION public.submit_enquiry(text, text, text, text, text, text, text, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.submit_enquiry(text, text, text, text, text, text, text, text) TO anon, authenticated, service_role;