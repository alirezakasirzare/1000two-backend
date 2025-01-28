export const stepDocs = {
  "/api/step": {
    post: {
      tags: ["step"],
    },
  },
  "/api/step/:id": {
    get: {
      tags: ["step"],
    },
    put: {
      tags: ["step"],
    },
    delete: {
      tags: ["step"],
    },
  },
  "/api/chapter/:id/steps": {
    get: {
      tags: ["step"],
    },
  },
};
