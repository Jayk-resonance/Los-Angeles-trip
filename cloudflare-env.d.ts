declare namespace Cloudflare {
  interface Env {
    DB?: D1Database;
    BUCKET?: R2Bucket;
    GOOGLE_MAPS_STATIC_API_KEY?: string;
  }
}
