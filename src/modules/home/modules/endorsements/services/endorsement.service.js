import { apolloClient } from "@/lib/api";

/**typeDefs */
import {
  getEndorsementType,
  getEndorsmentReport,
  addEndorsment,
  editEndorsement,
  getEndorsementsBySubscriptionId,
  getEndorsementById,
  getEndorsementByAccountcomplete,
  updateDocumentEndorsementById,
  updateDocumentsEndorsement,
} from "./dtos/endorsement.service.dtos";

class EndorsementsService {
  /**
   * Genera registro del endoso
   * @param {Object} params - Objeto para generar el registro del endoso
   * @param {Int} params.subscriptionId - ID de la suscripción del endoso
   * @param {Int} params.endorsmentType - Tipo de endoso
   * @param {Int} params.idUser - ID del usuario
   * @param {Int} params.accountId - ID de la nueva cuenta
   * @param {Date} params.effectiveDate - Fecha efectiva del endoso
   * @param {Object} params.report - objeto con los campos del excel
   * @param {Object} params.options - objeto con parametros opcionales
   * @returns {Object} - Objeto con la respuesta del servidor
   * @throws {Error} - Error en caso de fallo en la generación del registro
   */
  async addEndorsment({
    subscriptionId,
    endorsmentType,
    idUser,
    accountId,
    effectiveDate,
    report,
    files,
    options = {},
  }) {
    try {
      const variables = {
        data: {
          subscriptionId,
          endorsmentType,
          idUser,
          accountId,
          effectiveDate,
          report,
          files,
          transactionId: options.transactionId || null,
        },
      };

      const findResponse = apolloClient.mutate({
        variables,
        mutation: addEndorsment,
        fetchPolicy: "no-cache",
      });

      const { data } = await findResponse;

      const response = JSON.parse(data["addEndorsment"].response);

      return response;
    } catch (error) {
      //console.log(error)
      const message = String(error);
      throw new Error(message);
    }
  }

  async editEndorsement({ endorsementId, columnName, value }, options = {}) {
    try {
      const variables = {
        endorsementId,
        columnName,
        value,
        transactionId: options.transactionId || null,
      };

      const findResponse = apolloClient.mutate({
        variables,
        mutation: editEndorsement,
        fetchPolicy: "no-cache",
      });

      const { data } = await findResponse;

      const response = JSON.parse(data["editEndorsement"].response);

      return response;
    } catch (error) {
      //console.log(error)
      const message = String(error);
      throw new Error(message);
    }
  }

  /**
   * Genera el excel del endoso
   * @param {Object} params - Objeto para generar el reporte de excel del endoso
   * @param {Int} params.subscriptionId - ID de la suscripción del endoso
   * @param {Int} params.endorsmentType - Tipo de endoso
   * @param {Object} params.endorsmentReporData - Objeto con los campos para pintar el excel
   * @returns {Object} - Objeto con la respuesta del servidor
   * @throws {Error} - Error en caso de fallo en la generación del registro
   */
  async getEndorsmentReport({
    subscriptionId,
    endorsmentType,
    endorsmentReporData,
  }) {
    try {
      const variables = {
        data: {
          subscriptionId,
          endorsmentType,
          endorsmentReporData,
        },
      };

      const findResponse = apolloClient.query({
        variables,
        query: getEndorsmentReport,
        fetchPolicy: "no-cache",
      });

      const { data } = await findResponse;

      const result = data["getEndorsmentReport"];

      const { response } = result;

      return response;
    } catch (error) {
      //console.log(error)
      const message = String(error);
      throw new Error(message);
    }
  }

  /**
   * Obtiene el catalogo de los tipos de endoso
   */
  async getEndorsementType({ includeWorkStoppage = false } = {}) {
    try {
      const findResponse = apolloClient.query({
        query: getEndorsementType,
        fetchPolicy: "no-cache",
      });

      const { data } = await findResponse;
      const response = JSON.parse(data["getEndorsementType"].response);

      const normalize = (str) =>
        str
          ?.toString()
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");

      const excluded = [
        "deductions change",
        "deduction change",
        "change of share",
        "rate change",
        "bi adjustment",
      ];

      const renameCancellation = (e) => {
        const text = e.type || e.description;
        return normalize(text).includes("canelacion")
          ? { ...e, type: "Policy Cancellation" }
          : e;
      };

      const WORK_STOPPAGE_ID = 9;

      return response
        .filter((e) => !excluded.includes(normalize(e.type)))
        .filter((e) => includeWorkStoppage || e.id !== WORK_STOPPAGE_ID)
        .map(renameCancellation)
        .map((e) =>
          e.id === WORK_STOPPAGE_ID ? { ...e, type: "construction work stoppage" } : e
        );
    } catch (error) {
      //console.log(error)
      const message = String(error);
      throw new Error(message);
    }
  }

  async getEndorsementsBySubscriptionId(id) {
    const variables = { id };
    const { data } = await apolloClient.query({
      query: getEndorsementsBySubscriptionId,
      variables,
      fetchPolicy: "no-cache",
    });
    const { response } = data.getEndorsementsBySubscriptionId;
    const parsedResponse = JSON.parse(response);
    return parsedResponse;
  }

  async getEndorsementById(id) {
    const variables = { id };
    const { data } = await apolloClient.query({
      query: getEndorsementById,
      variables,
      fetchPolicy: "no-cache",
    });
    const { response } = data.getEndorsementById;
    const parsedResponse = JSON.parse(response);
    return parsedResponse;
  }

  async getEndorsementByAccountcomplete(idAccountComplete) {
    const variables = { idAccountComplete };
    const { data } = await apolloClient.query({
      query: getEndorsementByAccountcomplete,
      variables,
      fetchPolicy: "no-cache",
    });
    const { response } = data.getEndorsementByAccountcomplete;
    const parsedResponse = JSON.parse(response);
    return parsedResponse;
  }

  async updateDocumentEndorsementById(id) {
    const variables = { id };
    const { data } = await apolloClient.query({
      query: updateDocumentEndorsementById,
      variables,
      fetchPolicy: "no-cache",
    });
    const { response } = data.updateDocumentEndorsementById;
    const parsedResponse = JSON.parse(response);
    return parsedResponse;
  }

  async updateDocumentsEndorsement({ id, files }) {
    const variables = {
      data: { id, files },
    };
    const { data } = await apolloClient.mutate({
      mutation: updateDocumentsEndorsement,
      variables,
      fetchPolicy: "no-cache",
    });
    const { response } = data.updateDocumentsEndorsement;
    const parsedResponse = JSON.parse(response);
    return parsedResponse;
  }
}

export default new EndorsementsService();
