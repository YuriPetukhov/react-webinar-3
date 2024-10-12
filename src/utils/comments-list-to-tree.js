import clone from 'lodash/cloneDeep';

/**
 * Преобразование списка комментариев в иерархию
 * @param rawList {Array} Список объектов с отношением на родителя
 * @param maxDepth {number} Максимальная глубина вложенности
 * @returns {Array} Корневые узлы
 */
export default function commentsListToTree(rawList) {
  const list = rawList.map(item => clone(item));
  const map = {};
  const roots = [];

  for (let i = 0; i < list.length; i += 1) {
    map[list[i]._id] = i;
    list[i].children = [];
    list[i].depth = 0; // Добавляем свойство для отслеживания глубины
  }
  for (let i = 0; i < list.length; i += 1) {
    const node = list[i];
    if (node.parent['_type'] === 'article') {
      roots.push(node);
    } else {
      const parentIndex = map[node.parent._id];
      node.depth = list[parentIndex].depth + 1;
      list[parentIndex].children.push(node);
    }
  }

  return roots;
}
