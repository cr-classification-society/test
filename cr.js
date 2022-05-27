$(document).ready(() => {
  $("#dialog").dialog({
    autoOpen: false,
    modal: true,
    buttons: {
      Save() {
        $(this).dialog("close");
        $("#mform").submit();
      },
      Cancel() {
        $(this).dialog("close");
      },
    },
  });
});

// eslint-disable-next-line no-unused-vars
function add() {
  const sure = window.confirm("Are you sure to add a new form?");
  if (sure) {
    $.post("add.php", { CSRFToken }, (data) => {
      console.log(data);
      window.location = "./?status=0";
    });
  }
}

// eslint-disable-next-line no-unused-vars
function mod(id) {
  const status = $(`#status_${id}`).val();
  const template = $(`#template_${id}`).val();
  const templateE = $(`#templateE_${id}`).val();
  const templateR = $(`#templateR_${id}`).val();
  const fno = $(`#fno_${id}`).text();
  const fno2 = $(`#fno2_${id}`).text();
  const fname = $(`#fname_${id}`).text();
  const ver = $(`#ver_${id}`).text();
  const cat = $(`#cat_${id}`).val();
  const seq = $(`#seq_${id}`).text();
  const shiptype = $(`#shiptype_${id}`).text();
  const material = $(`#material_${id}`).text();
  const flag = $(`#flag_${id}`).text();
  let surveyitem = $(`#surveyitem_${id}`).text();
  let nonSurveyitem = $(`#non_surveyitem_${id}`).text();
  const doubleSkin = $(`#double_skin_${id}`).text();
  const spCond = $(`#sp_cond_${id}`).text();
  const search = $("#certTable_filter input:first").val();

  $("#dialog #fid").val(id);
  $("#dialog #copy").val(id);
  $("#dialog #fno").val(fno);
  $("#dialog #fno2").val(fno2);
  $("#dialog #fname").val(fname);
  $("#dialog #ver").val(ver);
  $("#dialog #cat").val(cat);
  $("#dialog #seq").val(seq);
  $("#dialog #shiptype").val(shiptype);
  $("#dialog #material").val(material);
  $("#dialog #flag").val(flag);
  $("#dialog #double_skin").val(doubleSkin);
  $("#dialog #sp_cond").val(spCond);
  $("#dialog #search").val(search);
  $("#dialog #templateID").val(template);
  $("#dialog #templateEnID").val(templateE);
  $("#dialog #templateReID").val(templateR);
  $("#dialog #status").val(status);
  $("#dialog #file").val("");
  $("#dialog #fileRecord").val("");
  $("#dialog #file2").val("");

  $(".surveytable input[type='checkbox']").prop("checked", false);
  if (surveyitem.length > 0) {
    surveyitem = JSON.parse(surveyitem);
    surveyitem.forEach((value) => {
      $(`.surveytable [value|=${value}]`).prop("checked", true);
    });
  }

  $(".surveytable2 input[type='checkbox']").prop("checked", false);
  if (nonSurveyitem.length > 0) {
    nonSurveyitem = JSON.parse(nonSurveyitem);
    nonSurveyitem.forEach((value) => {
      $(`.surveytable2 [value|=${value}]`).prop("checked", true);
    });
  }

  if ((cat >= 1 && cat <= 1.5) || cat === "4") {
    $("#dialog .record").show();
    $("#dialog .endorse").show();
  } else {
    $("#dialog .record").show();
    $("#dialog .endorse").hide();
  }

  $("#dialog #template").val(null);

  $("#dialog").dialog("option", "width", 1400);
  $("#dialog").dialog("open");
}

// eslint-disable-next-line no-unused-vars
function reload() {
  const cat = document.getElementById("cat");
  if ((cat.value >= 1 && cat.value <= 1.5) || cat.value === "4") {
    document.getElementsByClassName("record")[0].style = "display:table-cell";
    document.getElementsByClassName("record")[1].style = "display:table-cell";
    document.getElementsByClassName("endorse")[0].style = "display:table-cell";
    document.getElementsByClassName("endorse")[1].style = "display:table-cell";
  } else {
    document.getElementsByClassName("record")[0].style = "display:table-cell";
    document.getElementsByClassName("record")[1].style = "display:table-cell";
    document.getElementsByClassName("endorse")[0].style = "display:none";
    document.getElementsByClassName("endorse")[1].style = "display:none";
  }
}

$(document).ready(function () {
  $("#copy").click(function () {
    $.post("copy.php", { fid: $(this).val(), CSRFToken }, function (data) {
      if (data !== "") alert(data);
      window.location.reload();
    });
  });
});
