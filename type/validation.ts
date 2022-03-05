async function isValidId(id: any) {
  if (_.isUndefined(id)) {
    throw new Error('키값이 유효하지 않습니다.')
  }
}
