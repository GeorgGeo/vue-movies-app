
// функция для возврата данных из ответа
function returnData(response) {
  console.log("Response data:", response.data);
  // console.log("Response:", response);
  return response.data;
}

export default function (axios) {
  axios.interceptors.response.use(returnData);
}