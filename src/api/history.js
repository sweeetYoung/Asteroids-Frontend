import { request } from "../utils/axios";

export async function getAllHistory() {
  return request({
    method: 'get',
    url: '/history'
  })
}

export async function getAllHistoryForMiner(minerId) {
  return request({
    method: 'get',
    url: '/history',
    param: {
      'minerId': minerId
    }
  })
}

export async function getOneHistory(historyId) {
  return request({
    method: 'get',
    url: `/history/${historyId}`,
  })
}

export async function createOneHistory(params) {
  return request({
    method: 'post',
    url: `/history`,
    data: params
  })
}

export async function updateOneHistory(historyId, params) {
  return request({
    method: 'put',
    url: `/history/${historyId}`,
    data: params
  })
}

export async function deleteOneHistory(historyId) {
  return request({
    method: 'delete',
    url: `/history/${historyId}`
  })
}

