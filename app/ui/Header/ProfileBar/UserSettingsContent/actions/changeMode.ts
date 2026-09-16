"use server";

export default async function changeMode(formData: FormData) {
  const checkBoxValue = formData.get("switchThumb");

  console.log(checkBoxValue);
}
