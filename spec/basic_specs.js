var Ship = function(name) {
  var self = {
    shieldsRaised: false,
    photonTorpedoesArmed: false,
    atWarp: false,
    name: name
  };
  
  self.raiseShields = function() {
    self.shieldsRaised = true;
  };
  self.armPhotonTorpedoes = function() {
    self.photonTorpedoesArmed = true;
  };
  self.goToWarp = function() {
    setTimeout(function() {
      self.atWarp = true;
    }, 200);
  };

  return self;
}

var Replicator = {
  makeDrink: function() {
  }
}

var Ipad = function(ship) {
  var self = {};

  self.redAlert = function() {
    ship.raiseShields();
    ship.armPhotonTorpedoes();
  };
  self.yellowAlert = function() {
    ship.raiseShields();
  };
  self.engage = function() {
    ship.goToWarp();
  };
  self.requestDrink = function() {
    return Replicator.makeDrink("Earl Grey Tea", "hot");
  };
  self.sendHail = function(callback) {
    $.ajax({
      type: "GET",
      url: "http://space/the_final_frontier",
      success: function(response) {
        callback();
      }
    });
  }

  return self;
}

describe("Picard's new iPad", function() {
  var enterprise;
  var ipad;

  beforeEach(function() {
    enterprise = new Ship("Enterprise");
    ipad = new Ipad(enterprise);
  });

  describe("activating red alert", function() {
    beforeEach(function() {
      ipad.redAlert();
    });

    it("should raise shields", function() {
      expect(enterprise.shieldsRaised).toEqual(true);
    });
    it("should arm photon torpedoes", function() {
      expect(enterprise.photonTorpedoesArmed).toEqual(true);
    });
  });

  describe("activating yellow alert", function() {
    beforeEach(function() {
      ipad.yellowAlert();
    });

    it("should raise shields", function() {
      expect(enterprise.shieldsRaised).toEqual(true);
    });
    it("should NOT arm photon torpedoes", function() {
      expect(enterprise.photonTorpedoesArmed).toEqual(false);
    });
  });

  describe("engage", function() {
    beforeEach(function() {
      spyOn(enterprise, 'goToWarp');
      ipad.engage();
    });

    it("should call go to warp", function() {
      expect(enterprise.goToWarp).toHaveBeenCalled();
    });
  });

  describe("requestDrink", function() {
    it("should return a Earl Grey Tea, Hot", function() {
      spyOn(Replicator, "makeDrink").andCallFake(function(drinkType, temperature) {
        return {
          drink_type: drinkType,
          temperature: temperature
        }
      });
      var drink = ipad.requestDrink();
      expect(drink.drink_type).toEqual("Earl Grey Tea");
      expect(drink.temperature).toEqual("hot");
    });
  });

  describe("sendHail", function() {
    it("should send hail and execute callback", function() {
      spyOn($, "ajax").andCallFake(function(options) {
        options.success();
      });
      callback = jasmine.createSpy();
      ipad.sendHail(callback);

      expect(callback).toHaveBeenCalled();
    });
  });
});

describe("Starship", function() {
  var ship;
  beforeEach(function() {
    ship = new Ship("Enterprise");
  });
  describe("goToWarp", function() {
    beforeEach(function() {
      runs(function() {
        ship.goToWarp();
      });

      waitsFor(function() {
        return ship.atWarp == true;
      });
    });
    it("should send ship to warp", function() {
      expect(ship.atWarp).toEqual(true)
    });
  });
});

$(function() {
  var enterprise = new Ship("enterprise");
  var ipad = new Ipad(enterprise);

  $("#red-alert").click(function() {
    ipad.redAlert();
  });
});

var IpadView = function(ipad) {
  $("#red-alert").click(function() {
    ipad.redAlert();
  });
}

describe("IpadView", function() {
  var enterprise;
  var ipad;

  beforeEach(function() {
    enterprise = new Ship("Enterprise");
    ipad = new Ipad(enterprise);
  });

  describe("activate red alert", function() {
    beforeEach(function() {
      $("#sandbox").html("<div id='red-alert'></div>");
      new IpadView(ipad);
      $("#red-alert").trigger("click");
    });
    afterEach(function() {
      $("#sandbox").html();
    });
    it("should set to red alert", function() {
      expect(enterprise.shieldsRaised).toEqual(true);
    });
  });
});