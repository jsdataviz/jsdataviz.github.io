// Data loader (Observable Framework convention: <name>.json.js runs at build
// time in Node, and whatever it writes to stdout becomes <name>.json, served
// as a normal static file the page can FileAttachment() at runtime).
//
// This is how CARTO's basemap key gets from the environment into client-side
// map code without hardcoding it into a committed source file. It's not
// hiding a secret from the browser, though - CARTO's raster tiles require
// the key as a `?key=` query param on every tile request, so it's visible in
// the Network tab on any page that renders a map regardless of how we wire
// it up. The point of loading it this way is just to keep it out of git and
// let it be rotated via environment variable instead of a code change.
//
// Locally: set CARTO_KEY in a .env file at the project root (gitignored).
// In CI: set it as a repository secret and pass it through as an env var to
// the build step (see the GitHub Actions workflow).

try {
  // Node 20.6+. No-ops (throws, which we swallow) if .env doesn't exist -
  // expected in CI, where the key comes from the environment directly.
  process.loadEnvFile();
} catch {}

const key = process.env.CARTO_KEY;

if (!key) {
  throw new Error(
    "Missing CARTO_KEY - set it in a .env file locally, or as an " +
    "environment variable in CI (see README / CI workflow)."
  );
}

process.stdout.write(JSON.stringify({ key }));
