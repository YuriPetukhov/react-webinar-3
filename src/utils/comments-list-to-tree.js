import clone from 'lodash/cloneDeep';

/**
 * Преобразование списка комментариев в иерархию
 * @param rawList {Array} Список объектов с отношением на родителя
 * @returns {Array} Корневые узлы
 */
export default function commentsListToTree(rawList) {
  const list = rawList.map(item => clone(item));
  const map = {};
  const roots = [];

  for (let i = 0; i < list.length; i += 1) {
    map[list[i]._id] = i;
    list[i].children = [];
  }

  for (let i = 0; i < list.length; i += 1) {
    const node = list[i];
    if (node.parent['_type'] === 'article') {
      roots.push(node);
    } else {
      list[map[node.parent._id]].children.push(node);
    }
  }

  return roots;
}