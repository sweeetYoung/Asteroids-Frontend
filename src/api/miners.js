import { request } from "../utils/axios";

export async function getAllMiners() {
  return request({
    method: 'get',
    url: '/miners'
  })
}

export async function getAllMinersForPlanet(planetId) {
  return request({
    method: 'get',
    url: '/miners',
    param: {
      'planetId': planetId
    }
  })
}

export async function getOneMiner(minerId) {
  return request({
    method: 'get',
    url: `/miners/${minerId}`,
  })
}

export async function createOneMiner(params) {
  return request({
    method: 'post',
    url: `/miners`,
    data: params
  })
}

export async function updateOneMiner(minerId, params) {
  return request({
    method: 'put',
    url: `/miners/${minerId}`,
    data: params
  })
}

export async function deleteOneMiner(minerId) {
  return request({
    method: 'delete',
    url: `/miners/${minerId}`
  })
}

