import axios from "axios";

import { expect, jest } from "@jest/globals";
import { getActorsFromMovies } from "./index";

jest.mock("axios");

describe("get actors from movies", () => {
  const mockGet = jest.fn();
  axios.get = mockGet;

  beforeEach(() => {
    mockGet.mockReset();
  });

  it("should get actors with multiple characters", async () => {
    mockGet.mockReturnValue(
      Promise.resolve({
        data: {
          cast: [
            {
              known_for_department: "Acting",
              name: "amigo",
              character: "Lion",
            },
          ],
        },
      })
    );
    const res = await getActorsFromMovies([
      { id: 1, original_title: "toto" },
      { id: 2, original_title: "loto" },
    ]);
    expect(res).toMatchObject({
      amigo: ["toto", "loto"],
    });
  });
  it("should return empty array if there are no movies found", async () => {
    const res = await getActorsFromMovies([]);
    expect(res).toStrictEqual([]);
  });

  it("should return empty object if there are no credits found", async () => {
    mockGet.mockReturnValue(
      Promise.resolve({
        data: {
          cast: [],
        },
      })
    );
    const res = await getActorsFromMovies([
      { id: 1, original_title: "toto" },
      { id: 2, original_title: "loto" },
    ]);
    expect(res).toStrictEqual({});
  });
});
