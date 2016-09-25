'use strict';

describe('Service: dmService', function() {
  // load the service's module
  beforeEach(module('hackathonApp.dmService'));

  // instantiate service
  var dmService;
  beforeEach(inject(function(_dmService_) {
    dmService = _dmService_;
  }));

  it('should do something', function() {
    expect(!!dmService).to.be.true;
  });
});
