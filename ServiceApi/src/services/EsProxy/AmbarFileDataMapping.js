export const AmbarFileDataMapping = {
    settings: {
        number_of_shards: 8,
        index: {
            query: {
                default_field: 'content.text',
            },
            mapper: {
                dynamic: false,
            }
        },
        analysis: {
            char_filter: {
                ambar_cf: {
                    type: 'mapping',
                    mappings: [
                        'ё => е',
                        'Ё => Е',
                        ': => \\u0020'
                    ]
                }
            },
            filter: {
                russian_replace_i: {
                    type: 'pattern_replace',
                    pattern: 'й',
                    replacement: 'и'
                },
                russian_stop: {
                    type: 'stop',
                    stopwords: '_russian_'
                },
                russian_stemmer: {
                    type: 'stemmer',
                    language: 'russian'
                },
                ambar_word_delimiter: {
                    type: 'word_delimiter',
                    generate_word_parts: true,
                    generate_number_parts: true,
                    catenate_words: true,
                    catenate_numbers: true,
                    catenate_all: true,
                    split_on_case_change: true,
                    split_on_numerics: true,
                    preserve_original: true
                },
                english_stop: {
                    type: 'stop',
                    stopwords: '_english_'
                },
                english_stemmer: {
                    type: 'stemmer',
                    language: 'english'
                },
                english_possessive_stemmer: {
                    type: 'stemmer',
                    language: 'possessive_english'
                },
                italian_elision: {
                    type: 'elision',
                    articles: [
                        'c',
                        'l',
                        'all',
                        'dall',
                        'dell',
                        'nell',
                        'sull',
                        'coll',
                        'pell',
                        'gl',
                        'agl',
                        'dagl',
                        'degl',
                        'negl',
                        'sugl',
                        'un',
                        'm',
                        't',
                        's',
                        'v',
                        'd'
                    ]
                },
                italian_stop: {
                    type: 'stop',
                    stopwords: '_italian_'
                },
                italian_stemmer: {
                    type: 'stemmer',
                    language: 'light_italian'
                },
                german_stop: {
                    type: 'stop',
                    stopwords: '_german_'
                },
                german_stemmer: {
                    type: 'stemmer',
                    language: 'light_german'
                }
            },
            analyzer: {
                ambar_keyword: {
                    tokenizer: 'keyword',
                    filter: [
                        'lowercase'
                    ]
                },
                ambar_ru: {
                    tokenizer: 'standard',
                    char_filter: [
                        'ambar_cf'
                    ],
                    filter: [
                        'lowercase',
                        'russian_stop',
                        'russian_morphology',
                        'english_morphology',
                        'ambar_word_delimiter',
                        'russian_replace_i'
                    ]
                },
                ambar_en: {
                    tokenizer: 'standard',
                    filter: [
                        'english_possessive_stemmer',
                        'lowercase',
                        'english_stop',
                        'english_stemmer',
                        'ambar_word_delimiter'
                    ]
                },
                ambar_it: {
                    tokenizer: 'standard',
                    filter: [
                        'italian_elision',
                        'lowercase',
                        'italian_stop',
                        'italian_stemmer'
                    ]
                },
                ambar_de: {
                    tokenizer: 'standard',
                    filter: [
                        'lowercase',
                        'german_stop',
                        'german_normalization',
                        'german_stemmer'
                    ]
                },
                ambar_cjk: {
                    tokenizer: 'standard',
                    filter: [
                        'cjk_width',
                        'lowercase',
                        'cjk_bigram',
                        'english_stop'
                    ]
                },
                ambar_pl: {
                    tokenizer: 'standard',
                    filter: [
                        'lowercase',
                        'polish_stem'
                    ]
                },
                ambar_cn: {
                    tokenizer: 'smartcn_tokenizer',
                    filter: [
                        'lowercase'
                    ]
                }
            }
        }
    },
    mappings: {
        ambar_file_hidden_mark: {
            _parent: {
                type: 'ambar_file'
            },
            properties: {
                id: {
                    type: 'keyword'
                },
                indexed_datetime: {
                    type: 'date',
                    format: 'yyyy-MM-dd HH:mm:ss.SSS'
                }
            }
        },
        ambar_file_tag: {
            _parent: {
                type: 'ambar_file'
            },
            properties: {
                id: {
                    type: 'keyword'
                },
                name: {
                    type: 'text',
                    analyzer: 'ambar_keyword',
                    fielddata: true,
                    fields: {
                        analyzed: {
                            type: 'text',
                            analyzer: '${ANALYZER}'
                        }
                    }
                },
                type: {
                    type: 'text',
                    analyzer: 'ambar_keyword',
                    fielddata: true,
                    fields: {
                        analyzed: {
                            type: 'text',
                            analyzer: '${ANALYZER}'
                        }
                    }
                },
                indexed_datetime: {
                    type: 'date',
                    format: 'yyyy-MM-dd HH:mm:ss.SSS'
                }
            }
        },
        ambar_file: {
            _source: {
                excludes: [
                    'content.text'
                ]
            },
            _all: {
                enabled: false
            },
            properties: {
                sha256: {
                    type: 'keyword'
                },
                file_id: {
                    type: 'keyword'
                },
                indexed_datetime: {
                    type: 'date',
                    format: 'yyyy-MM-dd HH:mm:ss.SSS'
                },
                content: {
                    properties: {
                        author: {
                            type: 'text',
                            analyzer: 'ambar_keyword',
                            fielddata: true,
                            fields: {
                                analyzed: {
                                    type: 'text',
                                    analyzer: '${ANALYZER}'
                                }
                            }
                        },
                        text: {
                            type: 'text',
                            analyzer: '${ANALYZER}',
                            term_vector: 'with_positions_offsets',
                            store: true
                        },
                        type: {
                            type: 'text',
                            analyzer: 'ambar_keyword',
                            fielddata: true,
                            fields: {
                                analyzed: {
                                    type: 'text',
                                    analyzer: '${ANALYZER}'
                                }
                            }
                        },
                        language: {
                            type: 'text',
                            analyzer: 'ambar_keyword',
                            fielddata: true,
                            fields: {
                                analyzed: {
                                    type: 'text',
                                    analyzer: '${ANALYZER}'
                                }
                            }
                        },
                        title: {
                            type: 'text',
                            analyzer: '${ANALYZER}'
                        },
                        processed_datetime: {
                            type: 'date',
                            format: 'yyyy-MM-dd HH:mm:ss.SSS'
                        },
                        size: {
                            type: 'long'
                        },
                        state: {
                            type: 'keyword'
                        },
                        thumb_available: {
                            type: 'boolean'
                        },
                        ocr_performed: {
                            type: 'boolean'
                        }
                    }
                },
                meta: {
                    properties: {
                        created_datetime: {
                            type: 'date',
                            format: 'yyyy-MM-dd HH:mm:ss.SSS'
                        },
                        full_name: {
                            type: 'text',
                            analyzer: 'ambar_keyword',
                            fielddata: true,
                            fields: {
                                analyzed: {
                                    type: 'text',
                                    analyzer: '${ANALYZER}'
                                }
                            }
                        },
                        full_name_parts: {
                            type: 'text',
                            analyzer: 'ambar_keyword',
                            fielddata: true,
                            fields: {
                                analyzed: {
                                    type: 'text',
                                    analyzer: '${ANALYZER}'
                                }
                            }
                        },
                        id: {
                            type: 'keyword'
                        },
                        short_name: {
                            type: 'text',
                            analyzer: 'ambar_keyword',
                            fielddata: true,
                            fields: {
                                analyzed: {
                                    type: 'text',
                                    analyzer: '${ANALYZER}'
                                }
                            }
                        },
                        extension: {
                            type: 'text',
                            analyzer: 'ambar_keyword',
                            fielddata: true,
                            fields: {
                                analyzed: {
                                    type: 'text',
                                    analyzer: '${ANALYZER}'
                                }
                            }
                        },
                        extra: {
                            properties: {
                                type: {
                                    type: 'keyword'
                                },
                                value: {
                                    type: 'text'
                                }
                            }
                        },
                        source_id: {
                            type: 'text',
                            analyzer: 'ambar_keyword',
                            fielddata: true,
                            fields: {
                                analyzed: {
                                    type: 'text',
                                    analyzer: '${ANALYZER}'
                                }
                            }
                        },
                        updated_datetime: {
                            type: 'date',
                            format: 'yyyy-MM-dd HH:mm:ss.SSS'
                        }
                    }
                }
            }
        }
    }
}