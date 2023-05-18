// test/suite/actions/packageJson/getDependencyDetails.ts
import * as assert from 'assert';
import { getDependencyDetails } from "../../../../actions/packageJson/getDependencyDetails";
import { ProjectPath } from '../../../../actions/io/ProjectPath';

describe('actions/packageJson/getDependencyDetails.ts', () => {
  it('root - happy path', () => {
    function assertDependency(depName: string, expectedVersion: string) {
      const result = getDependencyDetails(depName, ProjectPath.absolute(''));
      assert.ok(result);
      assert.equal(result.value, expectedVersion);
    }
    assertDependency('mocha', '^10.2.0');
    assertDependency('@vscode/test-electron', '^2.3.2');
    assertDependency('ts-sinon', '^2.0.2');
  });
});
