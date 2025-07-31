/**
 * Helper pour les réponses HTTP standardisées
 */
module.exports = {
  /**
   * Réponse Bad Request (400)
   * @param {object} res - L'objet réponse Express
   * @param {string} message - Message d'erreur
   */
  badRequest: (res, message = 'Invalid request') => {
    return res.status(400).json({
      success: false,
      message
    });
  },

  /**
   * Réponse Unauthorized (401)
   * @param {object} res - L'objet réponse Express
   * @param {string} message - Message d'erreur
   */
  unauthorized: (res, message = 'Unauthorized') => {
    return res.status(401).json({
      success: false,
      message
    });
  },

  /**
   * Réponse Not Found (404)
   * @param {object} res - L'objet réponse Express
   * @param {string} message - Message d'erreur
   */
  notFound: (res, message = 'Resource not found') => {
    return res.status(404).json({
      success: false,
      message
    });
  },

  /**
   * Réponse serveur (500)
   * @param {object} res - L'objet réponse Express
   * @param {string} message - Message d'erreur
   */
  serverError: (res, message = 'Internal server error') => {
    return res.status(500).json({
      success: false,
      message
    });
  },

  /**
   * Réponse OK (200)
   * @param {object} res - L'objet réponse Express
   * @param {object} data - Données à retourner
   * @param {string} message - Message optionnel
   */
  success: (res, data = null, message = '') => {
    const response = { success: true };
    if (message) response.message = message;
    if (data) response.data = data;
    return res.status(200).json(response);
  },

  /**
   * Réponse Created (201)
   * @param {object} res - L'objet réponse Express 
   * @param {object} data - Données créées
   * @param {string} message - Message optionnel
   */
  created: (res, data = null, message = 'Resource created successfully') => {
    const response = { success: true, message };
    if (data) response.data = data;
    return res.status(201).json(response);
  }
};
