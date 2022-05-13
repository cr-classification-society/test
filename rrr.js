function init() {
  var contentData = "", selectItem = {},
      stickerData = JSON.parse(decodeURIComponent($("#stickerData").val()));

  $("#dialog").dialog({
      open: function() {
          //取得內容資料
          $.each(stickerData, function(index, value) {
              contentData += "<tr><td>" + value["serialNo"] + "</td><td style='font-family: NotoSans2;color:black'>" + value["comp"] + "</td><td>" + value["addr"] + "</td><td>" + value["person"] + "</td><td>" + value["phone"] + "</td>" +
              "<td class=\"checkOption\" style=\"text-align: center;\">" +
              "<input type=\"hidden\" value=\"" + index + "\">" +
              "<input type=\"radio\" class=\"txtDir\" name=\"rd" + index + "\" value=\"0\">橫式 " +
              "<input type=\"radio\" class=\"txtDir\" name=\"rd" + index + "\" value=\"1\">直式 " +
              "<input type=\"checkbox\" name=\"ck" + index + "\" disabled>雙掛"
              "</td></tr>";
          });
          $("#dialogContent").html(contentData);
          $(".txtDir").each(function() {
              $(this).on("click", function() {
                  $(this).siblings("input[type=checkbox]").prop("disabled", false);
              });
          });
      },
      close: function() {
          // 重置資料
          selectItem = {};
          contentData = "";
          $("#dialogContent").html("");
      },
      hide: { effect: "drop", duration: 150, direction: "down" },
      width: 1200,
      height: 600,
      autoOpen: false,
      modal: true,
      title: "列印標籤",
      buttons: {
          "列印": function() {
              // 抓取所有勾選項目清單
              $(".checkOption").each(function() {
                  let id = $(this).find("input[type=hidden]").val();
                  if ($(this).find("input:checked:radio").length != 0) {
                      let td = $(this).siblings();
                      selectItem[id] = {
                          "comp" : td[1].textContent,
                          "addr" : td[2].textContent,
                          "person" : td[3].textContent,
                          "phone" : td[4].textContent
                      };
                      selectItem[id].txtdir = $(this).find("input:checked:radio").val();
                      if ($(this).find("input:checked:checkbox").length != 0) {
                          selectItem[id].chk = $(this).find("input:checked:checkbox").attr("name");
                      }
                  }
              });

              // 查看勾選清單是否有東西
              if (Object.keys(selectItem).length > 0) {
                  // 虛擬form submit 資料
                  let virtualForm = $("<form action=\"printSticker_docx.php\" target=\"_blank\" method=\"POST\"></form>");
                  virtualForm.append("<input name=\"selectItem\" value='" + JSON.stringify(selectItem) + "' />");
                  virtualForm.append("<input name=\"start\" value=\"" + $("#start").val() + "\" />");
                  virtualForm.appendTo($("#virtualFormContent")).trigger("submit");
                  $("#virtualFormContent").html("");
                  $("#dialog").dialog("close");
              } else {
                  alertNoClick("無選取列印項目");
              }
          },
          "取消": function() {
              $("#dialog").dialog("close");
          }
      }
  });

  // 事件監聽
  $("#stickerDialog").on("click", function() {
      $("#dialog").dialog("open");
  });
}

window.onload = init;
