import assert from "assert";
import { listScriptsByRegex } from "../../../../actions/packageJson/listScriptsByRegex.action";
import { ProjectPath } from "../../../../actions/io/ProjectPath";

describe('actions/packageJson/listScriptsByRegex.action.ts', () => {
  it('Find the right script', () => {
    const scripts = listScriptsByRegex(/test/, '.');
    let script: string = scripts['test'];
    assert.notEqual(script, '');
    assert.equal(script, "node ./out/src/test/runTest.js");
  });

  it('Find the right script in Sigo v2', () => {
    const scripts = listScriptsByRegex(/test/, '/home/l/dasa/sigo/v2');
    let script: string = scripts['test'];
    assert.equal(script, "jest");
  });
});
