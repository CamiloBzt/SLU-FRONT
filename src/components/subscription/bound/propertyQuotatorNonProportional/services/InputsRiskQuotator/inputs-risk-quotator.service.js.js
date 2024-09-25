// Repositories
import { apolloClient } from "@/lib/api";

// DTOs
import getAnalysisByIdDto from "./dtos/getAnalysisByIdDto.gql";
import setAnalysisDto from "./dtos/setAnalysisDto.gql";

export async function getAnalysisById({ id_subscription }) {
  const variables = {
    id_subscription: parseInt(id_subscription, 10),
  };
  const {
    data: { getAnalysisById },
  } = await apolloClient.query({
    query: getAnalysisByIdDto,
    variables,
    fetchPolicy: "no-cache",
  });
  const res = JSON.parse(getAnalysisById.response);
  return res;
}

export async function setAnalysis({ id_subscription, column, data }) {
  const variables = {
    id_subscription,
    column,
    data,
  };
  const {
    data: { setAnalysis },
  } = await apolloClient.query({
    query: setAnalysisDto,
    variables,
    fetchPolicy: "no-cache",
  });
  const res = JSON.parse(setAnalysis.response);
  return res;
}
