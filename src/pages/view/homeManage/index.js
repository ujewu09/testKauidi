let colInput = (t, key) => {
  return {
    render: (h, params) => {
      return h("Input", {
        props: {
          type: "text",
          value: t.data[params.index][key],
          placeholder: "请输入",
        },
        on: {
          "on-blur": (event) => {
            t.data[params.index][key] = event.target.value;
          },
        },
      });
    },
  };
}
let colSelect = (t) => {
  return {
    render: (h, params) => {
      return h(
        "Select", {
          props: {
            value: t.data[params.index].Goodsid 
          },
          on: {
            "on-change": (event) => {
              t.data[params.index].Goodsid = event;
              t.GoodList.forEach(ele => {
                if (ele.GoodsID == event)
                  t.data[params.index].GoodsType = ele.GoodsName
              });
            },
          },
        },

        t.GoodList.map((item) => {
          return h("Option", {
            props: {
              value: item.GoodsID,
              label: item.GoodsName,
            },
          });
        })
      );
    },
  };
}
let colTop = (t) => {
  return {
    render: (h, params) => {
      if (params.index != 0) {
        return h(
          "Button", {
            props: {
              type: "error",
              size: "small",
            },
            on: {
              "click": () => {
                t.data.splice(params.index, 1);
              },
            },
          },
          "删除"
        );
      }
    },
  };
}
let AddressCol = (t) => { 
  return {
    render: (h, params) => {
      let row = params.row;
      let str = `联系人：${row.UserName}，手机号：${row.Phone} 电话：${row.Tel} 地址：${row.CountryName}-${row.ProviceName} ${row.CityName ? row.CityName: ""} ${row.AreaName?row.AreaName: ""} ${row.Address?row.Address:""} `;
      let ztStr = `联系人：${row.Name}，手机号：${row.Phone} 电话：${row.Tel} 地址：${row.Address} `;
      return h("span", t.info.ServiceType == 2? str : ztStr);
    }
  }
}

let headerTop = (t) => {
  return {
    renderHeader: (h, index) => {
      return h(
        "Button", {
          props: {
            type: "primary",
            size: "small",
          },
          on: {
            "click": (e) => {
              if (t.data.length > 7) {
                t.$Message.warning('一次最多为8个');
                return false;
              }
              let info = {
                kdBillCode: "",
                Goods: "",
                Goodsid: "",
                Number: "",
                Goods_meno: "",
                MemberID: localStorage.getItem("userID")
              }
              t.data.push(info)
            },
          },
        },
        "+添加包裹"
      );
    },
  };
}

let baseInfo = () => {
  return {
    render: (h, params) => {
      return h("div", [
        h("div", [
          h("div", {
            domProps: {
              style: "display:flex;line-height: 30px",
              innerHTML: `<div style="width: 260px;">快递单号：<span style="color: #999;font-weight:bold;">${params.row.kdBillCode}</span></div>
                  <div style="width: 220px">尺寸(cm)：<span style="color: #ccc">${params.row.Size ? params.row.Size : 0*0*0}</span></div>`,
            },
          }),
          h("div", {
            domProps: {
              style: "display:flex;line-height: 30px",
              innerHTML: ` <div style="width: 260px;">到库时间：<span style="color: #ccc">${
                params.row.dd_time ? params.row.dd_time : "未到库"
              }</span></div>
                  <div style="width: 220px">体积重量：<span style="color: #ccc">${
                    params.row.Weight2
                  }</span></div>`,
            },
          }),
        
         
          h("div", {
            domProps: {
              style: "display:flex;line-height: 30px",
              innerHTML: `  <div style="width: 260px;">上架时间：<span style="color: #ccc">${
                params.row.inplaceTime ? params.row.inplaceTime : "未上架"
              }</span></div>
                  <div style="width: 220px">实际重量：<span style="color: #ccc">${
                    params.row.Weight
                  }</span></div>`,
            },
          }),
        ]),
      ]);
    },
  }
}

let delBag = (t) => {
  return {
    render: (h, params) => {
      return h("div", [
        h(
          "Button",
          {
            style: "margin-right: 4px",
            props: {
              type: "primary",
              size: "small",
            },
            on: {
              click: () => {
                t.showImg(params.row)
              },
            },
          },
          "图片"
        ),
        h(
          "Button",
          {
            style: "margin-right: 4px",
            props: {
              type: "warning",
              size: "small",
            },
            on: {
              click: () => {
                t.changeModal(params.row)
              },
            },
          },
          "编辑"
        ),
        h(
          "Button",
          {
            props: {
              type: "error",
              size: "small",
            },
            on: {
              click: () => {
                t.delModal(params)
              },
            },
          },
          "删除"
        ),
      ]);
    },
  }
}

export {
  colInput,
  colSelect,
  headerTop,
  colTop,
  baseInfo,
  delBag,
  AddressCol
}
