# Lambda Utility Functions

Repo for Lambda functions used in the current AWS setup:

* `cloudfront-error-204` is a Lambda@Edge function used to convert CloudFront error responses on vector tiles to 204 instead of 404, preventing [an issue where bubbles are duplicated between zooms](https://github.com/EvictionLab/eviction-maps/issues/406).
* `mailchimp-subscribe` is used to add emails submitted via HTML form to a MailChimp list and return a 302 redirect to a predefined URL.
