import axios from "~https/axios";

interface ResUrl {
  data: {
    data: {
      links: {
        url: string;
      };
    };
  };
}

export const uploadRequest = async (formData: FormData) => {
  const response = await axios
    .post(`https://test.raxskle.fun/api/v1/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res: ResUrl) => {
      console.log("上传成功", res);
      return res.data.data;
    });

  return response;
};
