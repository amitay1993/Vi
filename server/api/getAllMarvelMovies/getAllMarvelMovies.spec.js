import axios from "axios";

import { expect, jest } from "@jest/globals";
import { getAllMarvelMoviesNameAndId } from "./index";

jest.mock("axios");

describe("get marvel movies", () => {
  const mockGet = jest.fn();
  axios.get = mockGet;

  beforeEach(() => {
    mockGet.mockReset();
  });

  it("should get id and movie name", async () => {
    mockGet.mockReturnValue(
      Promise.resolve({
        data: {
          results: [
            { id: 1, original_title: "toto", year: 2001 },
            { id: 2, original_title: "loto", year: 2003 },
          ],
        },
      })
    );
    const res = await getAllMarvelMoviesNameAndId();
    expect(res).toMatchObject([
      { id: 1, original_title: "toto" },
      { id: 2, original_title: "loto" },
    ]);
  });
  it("should get id and movie name", async () => {
    mockGet.mockReturnValue(
      Promise.resolve({
        data: {
          results: [],
        },
      })
    );
    const res = getAllMarvelMoviesNameAndId();
    await expect(res).rejects.toThrowError();
  });
});
