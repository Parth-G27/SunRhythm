# Quickstart: Location Resolution

```bash
npm install && npm run dev   # open the printed URL
npm test                     # location + storage unit tests
```

1. Allow location → banner shows coordinates; reload → no prompt, same coordinates.
2. Clear site data, block location → banner says a default (New Delhi) is shown; "Use my location" retries.
3. DevTools → Network: no requests other than the app's own assets.
