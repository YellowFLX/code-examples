import {MachinePkg} from '../types';

export const questionHelper = {
  variants: {
    basic: 'dbc8bc2d-bccb-4266-b65c-5018cc24e0b7',
    everyone: 'e699aa0c-d532-4cb2-9428-23d68c8a17dd',
    everyoneNorisk: '045fc9b9-6d3a-42ee-a840-478616b8076c',
    norisk: '17aeabb9-d391-4caf-99fb-a4a073ff9b7b',
    oneByOne: 'b2339bdc-f310-4429-97bf-cd4c6eb5823b'
  }
};

export const pkgMock: MachinePkg = {
  uuid: 'b152a115-c56f-45b5-bc25-0cd5ef8df09a',
  name: 'testPkg',
  description: null,
  difficulty: null,
  type: null,
  rating: 0,
  isVerified: true,
  meta: {
    uuid: '4bb66cdf-3664-40c0-b9e2-f22d9bd25b3f',
    fingerprint: 'a0248e1c188ade0ef3715f3890234598760e9ca2cf766482643a62339db11900',
    legacyAuthor: 'yellow',
    legacyAuthorVkID: null,
    difficulty: 5,
    likes: 0,
    usages: 0
  },
  files: [],
  tags: [],
  user: {
    uuid: 'aaaa',
    email: 'asdasd@asdsa.ss',
    username: 'yellow',
    discriminator: '3333',
    verified: false,
    pictures: [],
    profile: {
      color: null,
      pattern: null,
      about: 'yellow',
      userUuid: 'aaaa'
    },
    membership: null,
    stats: [],
    createdAt: 'asdsad',
    _count: {
      packages: 0
    }
  },
  userUuid: 'aaaa',
  createdAt: '2022-12-04T10:53:02.832Z',
  updatedAt: '2022-12-04T10:53:02.832Z',
  versions: [
    {
      uuid: '08c5b7b5-60b6-452f-9538-d8784acac6d6',
      changelog: '',
      published: true,
      createdAt: '2022-12-04T10:53:02.832Z',
      packageUuid: 'b152a115-c56f-45b5-bc25-0cd5ef8df09a',
      rounds: [
        {
          uuid: '82561512-fafb-4985-9f62-2fb7504af94d',
          name: 'р-1',
          type: 'BASIC',
          position: 0,
          versionUuid: '08c5b7b5-60b6-452f-9538-d8784acac6d6'
        },
        {
          uuid: 'b2f63486-60e5-4c55-aaac-5742d0f966e6',
          name: 'р-2',
          type: 'BASIC',
          position: 1,
          versionUuid: '08c5b7b5-60b6-452f-9538-d8784acac6d6'
        },
        {
          uuid: '01b5b339-93b7-45b4-a91a-eab04927fa20',
          name: 'Последний раунд',
          type: 'FINAL',
          position: 2,
          versionUuid: '08c5b7b5-60b6-452f-9538-d8784acac6d6'
        }
      ],
      themes: [
        {
          uuid: '91321d8c-837d-40a1-8668-f04b83569620',
          name: 'тема-1',
          description: '',
          position: 0,
          roundUuid: '82561512-fafb-4985-9f62-2fb7504af94d',
          versionUuid: '08c5b7b5-60b6-452f-9538-d8784acac6d6'
        },
        {
          uuid: 'bc84819f-a58e-4b6c-b043-b834ba2b7bf5',
          name: 'тема-1-2',
          description: '',
          position: 0,
          roundUuid: '82561512-fafb-4985-9f62-2fb7504af94d',
          versionUuid: '08c5b7b5-60b6-452f-9538-d8784acac6d6'
        },
        {
          uuid: '175a3a66-67eb-4e7d-acdf-ade4de4620b4',
          name: 'тема-2',
          description: 'description',
          position: 0,
          roundUuid: 'b2f63486-60e5-4c55-aaac-5742d0f966e6',
          versionUuid: '08c5b7b5-60b6-452f-9538-d8784acac6d6'
        },
        //
        {
          uuid: 'a6e83d0a-56a4-42e8-b3c8-0507a4625730',
          name: 'тема-3',
          description: '',
          position: 0,
          roundUuid: '01b5b339-93b7-45b4-a91a-eab04927fa20',
          versionUuid: '08c5b7b5-60b6-452f-9538-d8784acac6d6'
        },
        {
          uuid: 'a021227b-26ec-4fc5-bc43-6efbea67d9ca',
          name: 'тема-4',
          description: '',
          position: 0,
          roundUuid: '01b5b339-93b7-45b4-a91a-eab04927fa20',
          versionUuid: '08c5b7b5-60b6-452f-9538-d8784acac6d6'
        },
        {
          uuid: '820b9089-9b18-464f-9e56-617765a812d6',
          name: 'тема-5',
          description: '',
          position: 0,
          roundUuid: '01b5b339-93b7-45b4-a91a-eab04927fa20',
          versionUuid: '08c5b7b5-60b6-452f-9538-d8784acac6d6'
        },
        {
          uuid: '2dcf6806-0404-46cf-ac78-5fda14b5e294',
          name: 'тема-6',
          description: '',
          position: 0,
          roundUuid: '01b5b339-93b7-45b4-a91a-eab04927fa20',
          versionUuid: '08c5b7b5-60b6-452f-9538-d8784acac6d6'
        },
        {
          uuid: 'b0416aa2-d656-4bba-834c-8b37f076ed6a',
          name: 'тема-7',
          description: '',
          position: 0,
          roundUuid: '01b5b339-93b7-45b4-a91a-eab04927fa20',
          versionUuid: '08c5b7b5-60b6-452f-9538-d8784acac6d6'
        },
        {
          uuid: 'fadb4e86-c68a-4e4a-b9eb-3098d8295d8e',
          name: 'тема-8',
          description: '',
          position: 0,
          roundUuid: '01b5b339-93b7-45b4-a91a-eab04927fa20',
          versionUuid: '08c5b7b5-60b6-452f-9538-d8784acac6d6'
        },
        {
          uuid: '19aefd64-3d15-4114-afb6-59c520efc09f',
          name: 'тема-9',
          description: '',
          position: 0,
          roundUuid: '01b5b339-93b7-45b4-a91a-eab04927fa20',
          versionUuid: '08c5b7b5-60b6-452f-9538-d8784acac6d6'
        },
        {
          uuid: 'a2821b93-c4c4-4c44-af2f-cac43d32d2f5',
          name: 'тема-10',
          description: '',
          position: 0,
          roundUuid: '01b5b339-93b7-45b4-a91a-eab04927fa20',
          versionUuid: '08c5b7b5-60b6-452f-9538-d8784acac6d6'
        }
      ],
      questions: [
        {
          uuid: questionHelper.variants.basic,
          type: 'VARIANTS',
          price: 100,
          position: 0,
          source: null,
          themeUuid: '91321d8c-837d-40a1-8668-f04b83569620',
          versionUuid: '08c5b7b5-60b6-452f-9538-d8784acac6d6'
        },
        {
          uuid: questionHelper.variants.everyone,
          type: 'VARIANTS_EVERYONE',
          price: 100,
          position: 0,
          source: null,
          themeUuid: '91321d8c-837d-40a1-8668-f04b83569620',
          versionUuid: '08c5b7b5-60b6-452f-9538-d8784acac6d6'
        },
        {
          uuid: questionHelper.variants.everyoneNorisk,
          type: 'VARIANTS_EVERYONE_NORISK',
          price: 100,
          position: 0,
          source: null,
          themeUuid: '91321d8c-837d-40a1-8668-f04b83569620',
          versionUuid: '08c5b7b5-60b6-452f-9538-d8784acac6d6'
        },
        {
          uuid: questionHelper.variants.norisk,
          type: 'VARIANTS_NORISK',
          price: 100,
          position: 0,
          source: null,
          themeUuid: '91321d8c-837d-40a1-8668-f04b83569620',
          versionUuid: '08c5b7b5-60b6-452f-9538-d8784acac6d6'
        },
        {
          uuid: 'b2339bdc-f310-4429-97bf-cd4c6eb5823b',
          type: 'VARIANTS_ONE_BY_ONE',
          price: 100,
          position: 0,
          source: null,
          themeUuid: '91321d8c-837d-40a1-8668-f04b83569620',
          versionUuid: '08c5b7b5-60b6-452f-9538-d8784acac6d6'
        },
        //
        {
          uuid: '9121945b-cd64-4565-a2a5-d72b395f2ebf',
          type: 'BASIC',
          price: 100,
          position: 0,
          source: null,
          themeUuid: '91321d8c-837d-40a1-8668-f04b83569620',
          versionUuid: '08c5b7b5-60b6-452f-9538-d8784acac6d6'
        },
        {
          uuid: 'c3bd5e7a-317f-4fe9-a43b-3c6f44341734',
          type: 'NORISK',
          price: 200,
          position: 0,
          source: null,
          themeUuid: '91321d8c-837d-40a1-8668-f04b83569620',
          versionUuid: '08c5b7b5-60b6-452f-9538-d8784acac6d6'
        },
        {
          uuid: '240b4ab1-3e88-46c3-a8b8-f7437b540a98',
          type: 'SECRET',
          price: 300,
          position: 0,
          source: null,
          themeUuid: '91321d8c-837d-40a1-8668-f04b83569620',
          versionUuid: '08c5b7b5-60b6-452f-9538-d8784acac6d6'
        },
        {
          uuid: '8a7b6f6b-5b17-4266-a3ab-bc11e2e324ee',
          type: 'BASIC',
          price: 100,
          position: 0,
          source: null,
          themeUuid: '175a3a66-67eb-4e7d-acdf-ade4de4620b4',
          versionUuid: '08c5b7b5-60b6-452f-9538-d8784acac6d6'
        },
        {
          uuid: '4e361803-b2bd-4060-bd70-a4c0ee576c42',
          type: 'BASIC',
          price: 200,
          position: 0,
          source: null,
          themeUuid: '175a3a66-67eb-4e7d-acdf-ade4de4620b4',
          versionUuid: '08c5b7b5-60b6-452f-9538-d8784acac6d6'
        }
      ],
      steps: [
        // BASIC VARIANT
        {
          uuid: '222c17dd-ce33-486c-b596-750755a3ee3c',
          type: 'TEXT',
          payload: 'вопрос с вариантом',
          caption: null,
          variants: ['1', '2', '3', '4'],
          duration: 42.3,
          position: 0,
          isAnswer: true,
          questionUuid: questionHelper.variants.basic,
          versionUuid: '08c5b7b5-60b6-452f-9538-d8784acac6d6'
        },
        {
          uuid: '8cc0bc71-bf16-4ec2-a58f-7669923c2376',
          type: 'TEXT',
          payload: 'ответ на вопрос с вариантом',
          caption: null,
          variants: ['4'],
          duration: 42.3,
          position: 0,
          isAnswer: true,
          questionUuid: questionHelper.variants.basic,
          versionUuid: '08c5b7b5-60b6-452f-9538-d8784acac6d6'
        },
        // EVERYONE VARIANT
        {
          uuid: 'b763f0bd-aaae-4596-aef9-9d4c9020889c',
          type: 'TEXT',
          payload: 'вопрос с вариантом',
          caption: null,
          variants: ['1', '2', '3', '4'],
          duration: 42.3,
          position: 0,
          isAnswer: true,
          questionUuid: questionHelper.variants.everyone,
          versionUuid: '08c5b7b5-60b6-452f-9538-d8784acac6d6'
        },
        {
          uuid: '1d1b8ec1-da81-4bb9-b692-59d5b6676cc8',
          type: 'TEXT',
          payload: 'ответ на вопрос с вариантом',
          caption: null,
          variants: ['4'],
          duration: 42.3,
          position: 0,
          isAnswer: true,
          questionUuid: questionHelper.variants.everyone,
          versionUuid: '08c5b7b5-60b6-452f-9538-d8784acac6d6'
        },
        // EVERYONE NORISK VARIANT
        {
          uuid: '3df9bf1e-eb23-4d66-9d33-9949e6035187',
          type: 'TEXT',
          payload: 'вопрос с вариантом',
          caption: null,
          variants: ['1', '2', '3', '4'],
          duration: 42.3,
          position: 0,
          isAnswer: true,
          questionUuid: questionHelper.variants.everyoneNorisk,
          versionUuid: '08c5b7b5-60b6-452f-9538-d8784acac6d6'
        },
        {
          uuid: '07ae6fb2-b4c7-41dc-a838-95d8e60faf89',
          type: 'TEXT',
          payload: 'ответ на вопрос с вариантом',
          caption: null,
          variants: ['4'],
          duration: 42.3,
          position: 0,
          isAnswer: true,
          questionUuid: questionHelper.variants.everyoneNorisk,
          versionUuid: '08c5b7b5-60b6-452f-9538-d8784acac6d6'
        },
        //
        {
          uuid: '3c3fa8071-b4a0-4a81-bc68-8e183a8ffbd1',
          type: 'TEXT',
          payload: 'ответ-1',
          caption: null,
          variants: [],
          duration: 42.3,
          position: 0,
          isAnswer: true,
          questionUuid: '9121945b-cd64-4565-a2a5-d72b395f2ebf',
          versionUuid: '08c5b7b5-60b6-452f-9538-d8784acac6d6'
        },
        {
          uuid: '3c3fa8072-b4a0-4a81-bc68-8e183a8ffbd1',
          type: 'TEXT',
          payload: 'norisk-ответ-1',
          caption: null,
          variants: [],
          duration: -1,
          position: 0,
          isAnswer: true,
          questionUuid: '9221945b-cd64-4565-a2a5-d72b395f2ebf',
          versionUuid: '08c5b7b5-60b6-452f-9538-d8784acac6d6'
        },
        {
          uuid: '3c3fa8073-b4a0-4a81-bc68-8e183a8ffbd1',
          type: 'TEXT',
          payload: 'secret-ответ-1',
          caption: null,
          variants: [],
          duration: -1,
          position: 0,
          isAnswer: true,
          questionUuid: '9321945b-cd64-4565-a2a5-d72b395f2ebf',
          versionUuid: '08c5b7b5-60b6-452f-9538-d8784acac6d6'
        },
        {
          uuid: 'b33dd28a4-b921-45b0-9ba1-85d8ac2afef7',
          type: 'TEXT',
          payload: 'вопрос-2',
          caption: null,
          variants: [],
          duration: -1,
          position: 0,
          isAnswer: false,
          questionUuid: 'b2e4c88c-136b-4441-8bdc-05dd3ec076bc',
          versionUuid: '08c5b7b5-60b6-452f-9538-d8784acac6d6'
        },
        {
          uuid: 'c0c7f5185-937d-4dc4-8367-b4d2f97f7586',
          type: 'AUDIO',
          payload: 'вопрос-1',
          caption: null,
          variants: [],
          duration: 31,
          position: 0,
          isAnswer: false,
          questionUuid: '9121945b-cd64-4565-a2a5-d72b395f2ebf',
          versionUuid: '08c5b7b5-60b6-452f-9538-d8784acac6d6'
        },
        {
          uuid: 'c0c7f5186-937d-4dc4-8367-b4d2f97f7586',
          type: 'TEXT',
          payload: 'norisk-вопрос-1',
          caption: null,
          variants: [],
          duration: -1,
          position: 0,
          isAnswer: false,
          questionUuid: '9221945b-cd64-4565-a2a5-d72b395f2ebf',
          versionUuid: '08c5b7b5-60b6-452f-9538-d8784acac6d6'
        },
        {
          uuid: 'c0c7f5187-937d-4dc4-8367-b4d2f97f7586',
          type: 'TEXT',
          payload: 'secret-вопрос-1',
          caption: null,
          variants: [],
          duration: -1,
          position: 0,
          isAnswer: false,
          questionUuid: '9321945b-cd64-4565-a2a5-d72b395f2ebf',
          versionUuid: '08c5b7b5-60b6-452f-9538-d8784acac6d6'
        },
        {
          uuid: 'e97778508-61c4-4bd8-80d1-82579dee7d46',
          type: 'TEXT',
          payload: 'ответ-2',
          caption: null,
          variants: [],
          duration: -1,
          position: 0,
          isAnswer: true,
          questionUuid: 'b2e4c88c-136b-4441-8bdc-05dd3ec076bc',
          versionUuid: '08c5b7b5-60b6-452f-9538-d8784acac6d6'
        },
        {
          uuid: '4218e5b59-473f-4586-88eb-a271cf6d2d4b',
          type: 'TEXT',
          payload: 'вопрос-21',
          caption: null,
          variants: [],
          duration: -1,
          position: 0,
          isAnswer: false,
          questionUuid: '8a7b6f6b-5b17-4266-a3ab-bc11e2e324ee',
          versionUuid: '08c5b7b5-60b6-452f-9538-d8784acac6d6'
        },
        {
          uuid: '9e46d98610-1345-48f6-96fa-e1e619468627',
          type: 'TEXT',
          payload: 'ответ-21',
          caption: null,
          variants: [],
          duration: -1,
          position: 0,
          isAnswer: true,
          questionUuid: '8a7b6f6b-5b17-4266-a3ab-bc11e2e324ee',
          versionUuid: '08c5b7b5-60b6-452f-9538-d8784acac6d6'
        },
        {
          uuid: 'caf8ac3c11-5b17-42a0-957b-e8c64708f633',
          type: 'TEXT',
          payload: 'вопрос-22',
          caption: null,
          variants: [],
          duration: -1,
          position: 0,
          isAnswer: false,
          questionUuid: '4e361803-b2bd-4060-bd70-a4c0ee576c42',
          versionUuid: '08c5b7b5-60b6-452f-9538-d8784acac6d6'
        },
        {
          uuid: '61ccb1c2-e24e-492e-974e-d0c8fbe0061f',
          type: 'TEXT',
          payload: 'ответ-22',
          caption: null,
          variants: [],
          duration: -1,
          position: 0,
          isAnswer: true,
          questionUuid: '4e361803-b2bd-4060-bd70-a4c0ee576c42',
          versionUuid: '08c5b7b5-60b6-452f-9538-d8784acac6d6'
        }
      ]
    }
  ],
  _size: {
    questions: 0,
    steps: {
      text: 0,
      image: 0,
      audio: 0,
      video: 0
    }
  },
  _count: {
    ratings: 0
  }
};
