const check = async () => {
  try {
    const a = 1;
  } catch (e) {
    console.log(e);
  }
  setTimeout(check, 500);
};

export default async () => {
  await check();
};
