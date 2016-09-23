'use strict';

const BuildEnvironment = require('../lib/build-manager/build-environment');
const path = require('path');
const _ = require('lodash');
const helpers = require('blacksmith-test');
const chai = require('chai');
const expect = chai.expect;

describe('Build Manager', () => {
  before('prepare environment', () => {
    helpers.cleanTestEnv();
  });
  afterEach('clean environment', () => {
    helpers.cleanTestEnv();
  });
  it('creates an instance successfully', () => {
    const test = helpers.createTestEnv();
    const params = {
      platform: 'linux-x64',
      flavor: null,
      outputDir: test.buildDir,
      prefixDir: test.prefix,
      sandboxDir: test.sandbox,
      artifactsDir: path.join(test.buildDir, 'artifacts'),
      logsDir: path.join(test.buildDir, 'logs')
    };
    const be = new BuildEnvironment(params);
    const desiredBM = {
      'platform': 'linux-x64',
      'flavor': null,
      'outputDir': test.buildDir,
      'prefixDir': test.prefix,
      'maxParallelJobs': Infinity,
      'sandboxDir': test.sandbox,
      'artifactsDir': path.join(test.buildDir, 'artifacts'),
      'logsDir': path.join(test.buildDir, 'logs'),
      'target': {'platform': 'linux-x64', 'flavor': null, 'arch': 'x64', 'isUnix': true},
      '_envVarHandler': {
        '_environmentVars': {
          'CC': 'gcc',
          'LD_LIBRARY_PATH': '',
          'DYLD_LIBRARY_PATH': '',
          'PATH': process.env.PATH,
          'CFLAGS': ['-m64', '-fPIC', '-s']
        }
      }
    };
    _.each(desiredBM, (v, k) => expect(be[k]).to.be.eql(v));
  });
  it('add and gets an environment variable', () => {
    const test = helpers.createTestEnv();
    const params = {
      platform: 'linux-x64',
      flavor: null,
      outputDir: test.buildDir,
      prefixDir: test.prefix,
      sandboxDir: test.sandbox,
      artifactsDir: path.join(test.buildDir, 'artifacts'),
      logsDir: path.join(test.buildDir, 'logs')
    };
    const be = new BuildEnvironment(params);
    be.addEnvVariable('TEST', '1');
    const vars = be.getEnvVariables();
    expect(vars.TEST).to.be.eql('1');
  });
  it('add and gets several environment variables', () => {
    const test = helpers.createTestEnv();
    const params = {
      platform: 'linux-x64',
      flavor: null,
      outputDir: test.buildDir,
      prefixDir: test.prefix,
      sandboxDir: test.sandbox,
      artifactsDir: path.join(test.buildDir, 'artifacts'),
      logsDir: path.join(test.buildDir, 'logs')
    };
    const be = new BuildEnvironment(params);
    be.addEnvVariables({'TEST': '1', 'TEST2': '2'});
    const vars = be.getEnvVariables();
    expect(vars.TEST).to.be.eql('1');
    expect(vars.TEST2).to.be.eql('2');
  });
  it('reset environment variables', () => {
    const test = helpers.createTestEnv();
    const params = {
      platform: 'linux-x64',
      flavor: null,
      outputDir: test.buildDir,
      prefixDir: test.prefix,
      sandboxDir: test.sandbox,
      artifactsDir: path.join(test.buildDir, 'artifacts'),
      logsDir: path.join(test.buildDir, 'logs')
    };
    const be = new BuildEnvironment(params);
    be.addEnvVariable('TEST', '1');
    be.resetEnvVariables();
    const vars = be.getEnvVariables();
    expect(vars.TEST).to.be.eql(undefined);
  });
});
