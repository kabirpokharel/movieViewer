const isEmpty = (data) => {
  let emptyStatus = false;
  if (!data) {
    emptyStatus = true;
  }
  if (Array.isArray(data) && !data.length) {
    emptyStatus = true;
  }
  if (Object.keys(data).length === 0) {
    emptyStatus = true;
  }
  return emptyStatus;
};

export default isEmpty;
