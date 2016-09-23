'use strict';

const Artifact = require('../lib/build-manager/artifacts/artifact');
const _ = require('lodash');
const chai = require('chai');
const expect = chai.expect;

describe('Artifact', () => {
  it('creates an instance successfully', () => {
    const inputObject = {
      metadata: {id: 'component', version: '1.0.0'},
      prefix: 'component_prefix',
      pick: 'component_pick',
      mainLicense: {
        type: 'BSD3',
        licenseRelativePath: 'LICENSE'
      },
      sourceTarball: 'test.tar.gz',
      compiledTarball: {
        path: 'compiled-test.tar.gz',
        md5: 'testmd5'
      }
    };
    const result = {
      metadata: {id: 'component', version: '1.0.0'},
      prefix: 'component_prefix',
      pick: 'component_pick',
      mainLicense: {
        type: 'BSD3',
        licenseRelativePath: 'LICENSE'
      },
      sourceTarball: 'test.tar.gz',
      compiledTarball: {
        path: 'compiled-test.tar.gz',
        md5: 'testmd5'
      }
    };
    const artifact = new Artifact(inputObject);
    _.each(result, (v, k) => expect(artifact[k]).to.be.eql(v));
    expect(artifact.builtOn.toString()).to.be.eql(new Date().toString());
  });
});
