export const loadState = () => {
  try {
    const countAsString = localStorage.getItem("counterValue");
    const maxCountAsString = localStorage.getItem("maxCounterValue");
    const minCountAsString = localStorage.getItem("minCounterValue");
    if (
      countAsString === null ||
      maxCountAsString === null ||
      minCountAsString === null
    ) {
      return undefined;
    }
    return {
      count: JSON.parse(countAsString),
      maxCount: JSON.parse(maxCountAsString),
      minCount: JSON.parse(minCountAsString),
    };
  } catch (error) {
    console.log(error);
    return undefined;
  }
}; 

export const saveCount = (count: number) => {
    try {
    localStorage.setItem("counterValue", JSON.stringify(count))
  } catch {
    // ignore write errors
  }
}

export const saveState = (minCountValue: number, maxCountValue: number, countValue: number) => {
  try {
    localStorage.setItem("counterValue", JSON.stringify(countValue))
    localStorage.setItem("maxCounterValue", JSON.stringify(maxCountValue))
    localStorage.setItem("minCounterValue", JSON.stringify(minCountValue))
  } catch {
    // ignore write errors
  }
};