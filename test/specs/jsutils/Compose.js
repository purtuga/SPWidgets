define([
    "src/jsutils/Compose"
], function(Compose){

    describe("Compose - Factory Constructor", function(){

        beforeEach(function(){
            this.newPrototype = {
                getValue: function(){
                    return "value1"
                },
                init: function(){
                    this.staticValue = "value2";
                }
            };
            this.Factory = Compose.extend(this.newPrototype);
        });

        describe("Factory", function(){
            it("has .create() static method", function(){
                expect(Compose.create).toBeDefined();
            });

            it("has .extend() static method", function(){
                expect(Compose.extend).toBeDefined();
            });

            it("has .isInstanceOf() static method", function(){
                expect(Compose.isInstanceOf).toBeDefined();
            });

            it("has .init() prototype method", function(){
                expect(Compose.prototype.init).toBeDefined();
            });

            it("has .destroy prototype method", function(){
                expect(Compose.prototype.destroy).toBeDefined();
            });
        });

        describe("Intances get prototype with methods", function(){

            beforeEach(function(){
                this.inst = Compose.create();
            });

            it("has .init() method", function(){
                expect(this.inst.init).toBeDefined();
            });

            it("has .destroy method", function(){
                expect(this.inst.destroy).toBeDefined();
            });

        });

        describe(".extend(): returns new Factory", function(){

            it("has .create() static method", function(){
                expect(this.Factory.create).toBeDefined();
            });

            it("has .isInstanceOf() static method", function(){
                expect(this.Factory.isInstanceOf).toBeDefined();
            });

            it("has .extend() static method", function(){
                expect(this.Factory.extend).toBeDefined();
            });

        });

        describe(".extend(): returns new Factory from multiple mixins", function(){

            beforeEach(function(){
                this.Factory2 = Compose.extend({
                    init: function(){
                        this.initText = "factory2";
                    },
                    factory2: function(){
                        return "factory2";
                    }
                });
                this.Factory3 = Compose.extend(
                    this.Factory,
                    this.Factory2,
                    {
                        init: function(){
                            this.initText = "factory3";
                        },
                        factory3: function(){
                            return "factory3";
                        }
                    }
                );

                this.inst = this.Factory3.create();

            });

            it("contains methods from all factories", function(){
                expect(this.inst.factory2).toBeDefined();
                expect(this.inst.factory3).toBeDefined();
            });

            it("called .init() of last object given on input", function(){
                expect(this.inst.initText).toMatch("factory3");
            });

        });

        describe(".create(): creates new Instances", function(){

            beforeEach(function(){
                this.factoryInst = this.Factory.create();
            });

            it("calls .init()", function(){
                spyOn(this.Factory.prototype, "init");
                this.factoryInst = this.Factory.create();
                expect(this.factoryInst.init).toHaveBeenCalled();
            });

            it("has new methods", function(){
                expect(this.factoryInst.getValue).toBeDefined();
                expect(this.factoryInst.getValue()).toMatch(this.newPrototype.getValue());
            });

        });

        describe(".isInstanceOf(): validates instances against Factory", function(){

            beforeEach(function(){
                this.inst           = Compose.create();
                this.factoryInst    = this.Factory.create();
            });

            it("returns true if object is instance of Factory", function(){
                expect(Compose.isInstanceOf(this.inst)).toBe(true);
                expect(Compose.isInstanceOf(this.factoryInst)).toBe(true);
            });
            it("returns false if object is not instance of Factory", function(){
                expect(this.Factory.isInstanceOf(this.inst)).toBe(false);
            });

        });

    });
});