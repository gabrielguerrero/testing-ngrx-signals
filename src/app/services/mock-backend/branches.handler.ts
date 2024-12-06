import { http, HttpResponse } from 'msw';

import {
  Branch,
  BranchDetail,
  BranchQuery,
  BranchResponse,
} from '../../models';
import { sortData } from '@ngrx-traits/signals';
import { getRandomInteger } from './utils';

export const branchesHandlers = [
  http.get<Required<BranchQuery>, never, BranchResponse>(
    '/branches',
    ({ request }) => {
      let result = [...mockBranches];
      const params = new URL(request.url).searchParams;
      const options = {
        search: params.get('search'),
        sortColumn: params.get('sortColumn'),
        sortAscending: params.get('sortAscending'),
        skip: params.get('skip'),
        take: params.get('take'),
      };
      if (options?.search)
        result = mockBranches.filter((entity) => {
          return options?.search
            ? entity.name.toLowerCase().includes(options?.search.toLowerCase())
            : false;
        });
      const total = result.length;
      if (options?.skip || options?.take) {
        const skip = +(options?.skip ?? 0);
        const take = +(options?.take ?? 0);
        result = result.slice(skip, skip + take);
      }
      if (options?.sortColumn) {
        result = sortData(result, {
          field: options.sortColumn as any,
          direction: options.sortAscending === 'true' ? 'asc' : 'desc',
        });
      }
      return HttpResponse.json({
        resultList: result,
        total,
        hasMore: total > result.length,
      });
    },
  ),
  http.get<{ id: string }, never, BranchDetail | undefined>(
    '/branches/:id',
    ({ params }) => {
      const id = +params.id;
      const storeDetail = mockBranchesDetails.find((value) => value.id === id);
      return HttpResponse.json(storeDetail);
    },
  ),
];

const locations = [
  'Picadilly',
  'Angel',
  'Nothing Hill',
  'Canary Warf',
  'Woking',
  'Reading',
  'Waterloo',
  'Chelsea',
  'Peterborough',
  'Birmingham',
  'Kingston Upon Thames',
];
const streets = [
  'Grove Road',
  'The Green',
  'St. John’s Road',
  'Main Road',
  'The Avenue',
  'School Lane',
  'King Street',
  'Chester Road',
  'Church Lane',
  'Park Lane',
];
const postCodes = [
  'CV21 1HW',
  'WA6 6JX',
  'CV3 5EP',
  'M41 0XE',
  'GU2 8BA',
  'DE11 7NT',
  'PE12 8AJ',
  'AB15 9EP',
  'B67 6LL',
  'SG15 6AW',
  'M35 0BT',
  'NE16 4QS',
  'NP18 3EY',
  'NE61 5SR',
  'BS36 2FG',
  'PE12 9TZ',
  'DL17 8LE',
  'TS28 5BL',
  'SG4 0QS',
  'NE34 9JZ',
];
const names = [
  'Flower Iris',
  'Alexina Giles',
  'Alayah Marion',
  'Summer Darden',
  'Emery Kimmy',
  'Kenrick Dane',
  'Darius Shanene',
  'Frieda Tahlia',
  'Leroy Remy',
  'Beatrice Sharona',
  'Anabelle Mary Beth',
  'Kylie Trisha',
  'Clara Kester',
  'Tamela Harrietta',
  'Wendi Ellis',
];

const mockBranchesDetails: BranchDetail[] = new Array(500)
  .fill(null)
  .map((_, index) => {
    return {
      id: index,
      name: 'Branch ' + index,
      phone:
        getRandomInteger(100, 300) +
        ' ' +
        getRandomInteger(200, 400) +
        ' ' +
        getRandomInteger(3000, 6000),
      address: {
        line1:
          getRandomInteger(1, 99) +
          ' ' +
          streets[getRandomInteger(0, streets.length - 1)],
        postCode: postCodes[getRandomInteger(0, postCodes.length - 1)],
        country: 'UK',
        town: locations[getRandomInteger(0, locations.length - 1)],
      },
      manager: names[getRandomInteger(0, names.length - 1)],
      departments: new Array(200).fill(null).map((value, i) => ({
        id: i,
        name: 'Department ' + i + ' of Branch ' + index,
      })),
    };
  });
const mockBranches: Branch[] = mockBranchesDetails.map(
  ({ id, name, address }) => ({
    id,
    name,
    address: address.line1 + ', ' + address.town + ', ' + address.postCode,
  }),
);
