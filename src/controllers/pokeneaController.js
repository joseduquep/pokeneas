const { pokeneas } = require('../data/pokeneas');
const { getContainerId } = require('../utils/container');

function selectRandomPokenea() {
  if (!Array.isArray(pokeneas) || pokeneas.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * pokeneas.length);
  return pokeneas[randomIndex];
}

function getRandom(req, res) {
  const pokenea = selectRandomPokenea();

  if (!pokenea) {
    return res.status(500).json({
      message: 'No Pokeneas available',
      containerId: getContainerId()
    });
  }

  const { id, name, height, ability } = pokenea;
  return res.json({
    id,
    name,
    height,
    ability,
    containerId: getContainerId()
  });
}

function getRandomImage(req, res) {
  const pokenea = selectRandomPokenea();

  if (!pokenea) {
    return res.status(500).render('error', {
      message: 'No Pokeneas available',
      containerId: getContainerId()
    });
  }

  const { name, image, philosophicalPhrase } = pokenea;
  return res.render('pokenea-image', {
    name,
    image,
    philosophicalPhrase,
    containerId: getContainerId()
  });
}

module.exports = {
  getRandom,
  getRandomImage
};


