import assert from 'assert';
import { AppConfigSchema } from './models/schema.js';
import { CoreEngine } from './services/core-engine.js';

console.log("Running integration sanity tests for 02-Edge-Middleware-Geo-Block...");

try {
  assert.strictEqual(AppConfigSchema.service, "02-Edge-Middleware-Geo-Block");
  
  const engine = new CoreEngine({ service: "02-Edge-Middleware-Geo-Block" });
  const res = engine.executeAction("test_run");
  assert.ok(res.success);
  assert.strictEqual(res.action, "test_run");
  
  console.log("ALL TESTS PASSED SUCCESSFULLY");
  process.exit(0);
} catch (err) {
  console.error("Test validation failed:", err);
  process.exit(1);
}
