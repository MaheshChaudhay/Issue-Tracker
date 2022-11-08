function applyAJAX() {
  console.log("ajax applying");

  const filterBtn = $("#apply-filters");
  console.log(filterBtn);
  $(filterBtn).click(function (e) {
    e.preventDefault();
    const authors = $("#authors").val();
    const labels = $("#labels").val();
    console.log(authors);
    console.log(labels);
  });

  const data = JSON.stringify({
    labels,
    authors,
  });
  $.ajax({
    type: "post",
    url: $(formElement).attr("action"),
    data: data,
    success: function (data) {
      console.log(data);
      window.location = `http://localhost:8000/projects/project-detail/${projectId}`;
    },
    error: function (err) {
      console.log(err.responseText);
    },
  });
}

// applyAJAX();
