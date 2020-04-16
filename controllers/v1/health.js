'use strict';

function HealthController() {
}

HealthController.prototype.health = function () {
    return {status: 'ok'};
};

module.exports = HealthController;
