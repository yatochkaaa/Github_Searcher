const padTo2Digits = (num : number) => {
  return num.toString().padStart(2, '0');
}

const formatDate = (date: any) => {
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const newDate = new Date(date);

  return [
    padTo2Digits(newDate.getDate()),
    monthNames[newDate.getMonth()],
    newDate.getFullYear(),
  ].join(' ');
}

export default formatDate;