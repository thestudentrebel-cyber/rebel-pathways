DROP FUNCTION IF EXISTS public.submit_enquiry(text, text, text, text, text, text, text, text);

GRANT INSERT ON public.enquiries TO anon, authenticated;
GRANT ALL ON public.enquiries TO service_role;

DROP POLICY IF EXISTS "Validated public enquiry submissions" ON public.enquiries;
CREATE POLICY "Validated public enquiry submissions"
ON public.enquiries
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(btrim(full_name)) BETWEEN 1 AND 120
  AND length(btrim(company_name)) BETWEEN 1 AND 160
  AND length(btrim(email)) BETWEEN 3 AND 200
  AND lower(btrim(email)) ~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'
  AND length(coalesce(phone, '')) <= 50
  AND length(coalesce(website, '')) <= 200
  AND length(coalesce(service_required, '')) <= 80
  AND length(coalesce(business_description, '')) <= 2000
  AND length(coalesce(requirement, '')) <= 4000
  AND status = 'new'
);