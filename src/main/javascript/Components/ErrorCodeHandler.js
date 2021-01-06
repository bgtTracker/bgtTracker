export default function ErrorCodeHandling(code) {
  const redirect = code => {
    if (typeof window !== "undefined") {
      window.location.replace("/" + code);
    }
  };

  switch (code) {
    case code < 400:
      break;
    case 403:
      redirect(403);
      break;
    case 404:
      redirect(404);
      break;
    case 500:
      redirect(500);
      break;
    default:
      redirect("error");
  }
}
