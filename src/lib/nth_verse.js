/** @typedef {string} Verse */
/** @typedef {Verse[]} Chapter */
/** @typedef {{abbrev: string, chapters: Chapter[], name: string}} Book */
/** @typedef {Book[]} Bible */

/** @type {Bible} */ // @ts-ignore
import the_bible from "./the_bible";

const TOTAL_BIBLE_VERSES = 31100;
const OT_TOTAL_VERSES = 23147;
const NT_START_INDEX = 23148;
const NT_TOTAL_VERSES = 7952;

function get_verses() {
    let verses = [];

    the_bible.forEach((book, bookIndex) => {
        book.chapters.forEach((chapter, chIndex) => {
            chapter.forEach((verse, vIndex) => {
                verses.push({
                    book: {
                        name: book.name,
                        abbrev: book.abbrev,
                        bookNumber: bookIndex + 1,
                    },
                    chapterNumber: chIndex + 1,
                    verseNumber: vIndex + 1,
                    name: `${book.name} ${chIndex + 1}:${vIndex + 1}`,
                    verse,
                });
            });
        });
    });

    return verses;
}

/**
 * @param {number} n
 */
export function nth_verse(n) {
    const verses = get_verses();
    return verses[n - 1];
}

export function nth_verse_nt(n) {
    const verses = get_verses();
    return verses[NT_START_INDEX + n - 1];
}
