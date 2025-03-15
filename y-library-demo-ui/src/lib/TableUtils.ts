const fromTable = (tableString: string): string => {
  return tableString.replaceAll("%2C", ",");
};

const fromTableURL = (tableString: string): string => {
  return tableString
    .replaceAll("%2C", ",")
    .replaceAll("&quot;", '"')
    .replaceAll("&apos;", "'");
};

const toTable = (tableString: string): string => {
  return tableString
    .replaceAll(",", "%2C")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
};

export { fromTable, fromTableURL, toTable };
