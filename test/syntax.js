// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License in the project root for license information.

'use strict';
var assert = require("assert"),
  fs = require('fs'),
  path = require('path'),
  _ = require('lodash'),
  async = require('async'),
  RefParser = require('json-schema-ref-parser'),
  util = require('util'),
  utils = require('./util/utils');

var context;


// Useful when debugging a test for a particular swagger. 
// Just update the regex. That will return an array of filtered items.
// utils.swaggers = utils.swaggers.filter(function(item) {
//   return (item.match(/.*Microsoft.Logic.*2016-06-01.*/ig) !== null);
// });
// utils.examples = utils.examples.filter(function(item) {
//   return (item.match(/.*Microsoft.Logic.*2016-06-01.*/ig) !== null);
// });


describe('Azure swagger schema validation:', function () {
  before(function (done) {
    utils.initializeValidator(function (err, result) {
      if (err) {
        done(err);
      }
      context = result;
      done();
    });
  });

  _(utils.swaggers).each(function (swagger) {
    it(swagger + ' should be a valid Swagger document.', function (done) {
      utils.parseJsonFromFile(swagger, function (err, parsedData) {
        if (err) { done(err); }
        if (parsedData.documents && util.isArray(parsedData.documents)) {
          console.log(util.format('Skipping the test for \'%s\' document as it seems to be a composite swagger doc.', swagger));
          done();
        }
        var valid = context.validator.validate(parsedData, context.extensionSwaggerSchema);
        if (!valid) {
          var error = context.validator.getLastErrors();
          throw new Error("Schema validation failed: " + util.inspect(error, { depth: null }));
        }
        assert(valid === true);
        done();
      });
    });
  }).value();

  describe('Azure x-ms-example schema validation:', function () {
    _(utils.examples).each(function (example) {
      it('x-ms-examples: ' + example + ' should be a valid x-ms-example.', function (done) {
        utils.parseJsonFromFile(example, function (err, parsedData) {
          if (err) { done(err); }
          var valid = context.validator.validate(parsedData, context.exampleSchema);
          if (!valid) {
            var error = context.validator.getLastErrors();
            throw new Error("Schema validation failed: " + util.inspect(error, { depth: null }));
          }
          assert(valid === true);
          done();
        });
      });
    }).value();
  });
});

describe('External file or url references ("$ref") in a swagger spec:', function () {
  _(utils.swaggers).each(function (swagger) {
    it(swagger + ' should be completely resolvable.', function (done) {
      RefParser.bundle(swagger, function (bundleErr, bundleResult) {
        if (bundleErr) {
          var msg = swagger + ' has references that cannot be resolved. They are as follows: \n' + util.inspect(bundleErr.message, { depth: null });
          console.log(msg);
          throw new Error(msg);
        }
        done();
      });
    });
  }).value();
});