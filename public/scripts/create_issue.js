function addAJAX() {
  const btn = $("#add-label-btn");
  const labelsDiv = $("#labels-div");
  const labelInputTag = $("#label_input");
  const formElement = $("#issue-form");
  $(btn).click(function (e) {
    const newLabel = $(labelInputTag).val();
    $(labelInputTag).val("");
    $(labelsDiv).append("<span class='label-span'>" + newLabel + "</span>");
  });

  $(formElement).submit(function (e) {
    e.preventDefault();
    const projectId = $(formElement).find('input[name="projectId"]').val();
    const title = $(formElement).find('input[name="title"]').val();
    const description = $(formElement)
      .find('textarea[name="description"]')
      .val();
    const labels = $(formElement).find('select[name="labels"]').val();
    const author = $(formElement).find('input[name="author"]').val();
    const spanLabels = $(".label-span");
    spanLabels.each(function (index, element) {
      labels.push($(this).text());
    });

    const data = JSON.stringify({
      author,
      labels,
      projectId,
      description,
      title,
    });
    $.ajax({
      type: "post",
      url: $(formElement).attr("action"),
      data: data,
      success: function (data) {
        console.log(data);
        window.location = `/projects/project-detail/${projectId}`;
      },
      error: function (err) {
        console.log(err.responseText);
      },
    });
  });
}

addAJAX();
