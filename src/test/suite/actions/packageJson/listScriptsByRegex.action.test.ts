import assert from "assert";
import { listScriptsByRegex } from "../../../../actions/packageJson/listScriptsByRegex.action";
import { ProjectPath } from "../../../../actions/io/ProjectPath";

describe('actions/packageJson/listScriptsByRegex.action.ts', () => {
  it('Find the right test script', () => {
    const scripts = listScriptsByRegex(/test/, '/home/l/dasa/sigo/v2');
    assert.equal(scripts, {
      "test": "node ./out/src/test/runTest.js",
    });
  });
});
