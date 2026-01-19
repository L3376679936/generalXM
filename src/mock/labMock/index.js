import Mock from "mockjs";

let template = (option) => {
  let a = { ...option };
  if (option == null) {
    a.size = 10;
    a.current = 1;
  }
  // let size =  a.size ? a.size : '10'
  // let current = a.current ?a.current : '1'
  return {
    code: "000000",
    mesg: "success",
    data: {
      total: 100,
      size: a.size,
      current: a.current,
      [`records|${a.size}`]: [
        {
          "id|+1": 1,
          // mock单位名称怎么写？
          batchName: "你好",
          areaCode: "@province()",
          unitCode: "@county(true)",
          validTime: `@date()~@date()`,
          buyTime: `@date()~@date()`,
          subsidyEstimate: "@integer(100, 1000)",
          month1: "@integer(100, 1000)",
          month2: "@integer(100, 1000)",
        },
      ],
    },
  };
};

export const data = Mock.mock(
  `http://localhost:3090/api/getFrom`,
  "post",
  (options) => {
    let option = JSON.parse(options.body);
    return Mock.mock(template(option));
  }
);
