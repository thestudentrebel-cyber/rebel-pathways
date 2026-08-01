DROP POLICY IF EXISTS "Anyone can submit an enquiry" ON public.enquiries;

REVOKE ALL ON public.enquiries FROM anon;
REVOKE ALL ON public.enquiries FROM authenticated;
GRANT ALL ON public.enquiries TO service_role;