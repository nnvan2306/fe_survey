import { useCallback, useEffect, useState } from "react";
import type { OptionType, QuestionType } from "../../../types/survey";
import "./styles.scss";
import { Box, Slider, TextField, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

type SliderDataType = {
    min: number;
    max: number;
    step: number;
    unit: string;
};

export type RangeSliderConfigJsonStringType = {
    data?: SliderDataType[];
};

type Props = {
    question: QuestionType & {
        configJsonString?: RangeSliderConfigJsonStringType;
    };
    handleUpdateQuestion: (
        key: keyof QuestionType,
        value:
            | string
            | number
            | boolean
            | OptionType[]
            | RangeSliderConfigJsonStringType
            | Record<string, unknown>
    ) => void;
};

const defaultData: SliderDataType = {
    min: 1,
    max: 10,
    step: 1,
    unit: "",
};

const RangeSlider = ({ question, handleUpdateQuestion }: Props) => {
    const [values, setValues] = useState<number[]>([]);

    const handleSliderChange = (newValue: number, target: number) => {
        setValues(
            values.map((item, index) => {
                if (index === target) {
                    return newValue;
                }
                return item;
            })
        );
    };

    const handleRangeConfigChange = useCallback(
        (
            index: number,
            key: keyof SliderDataType,
            value: SliderDataType[typeof key]
        ) => {
            const newRanges = Array.isArray(question?.configJsonString?.data)
                ? [...question.configJsonString.data]
                : [];
            if (!newRanges[index]) return;

            newRanges[index] = {
                ...newRanges[index],
                [key]: value,
            };
            if (typeof handleUpdateQuestion === "function") {
                handleUpdateQuestion("configJsonString", {
                    ...question?.configJsonString,
                    data: newRanges,
                });
            }
        },
        [handleUpdateQuestion, question?.configJsonString?.data]
    );

    const handleAddRange = useCallback(() => {
        if (typeof handleUpdateQuestion !== "function") return;
        const currentData = Array.isArray(question?.configJsonString?.data)
            ? question.configJsonString.data
            : [];
        const newData = [...currentData, { ...defaultData }];
        handleUpdateQuestion("configJsonString", {
            ...question?.configJsonString,
            data: newData,
        });
        setValues([...values, defaultData.max]);
    }, [handleUpdateQuestion, question?.configJsonString?.data, values]);

    useEffect(() => {
        const config = question?.configJsonString;
        // Check if configJsonString is an empty object OR if data is missing/empty
        const isEmptyConfigObject =
            config &&
            typeof config === "object" &&
            Object.keys(config).length === 0;
        const isDataMissingOrEmpty =
            !Array.isArray(config?.data) || config.data.length === 0;

        if (isEmptyConfigObject || isDataMissingOrEmpty) {
            // Only call handleUpdateQuestion if it is a function
            if (typeof handleUpdateQuestion === "function") {
                handleUpdateQuestion("configJsonString", {
                    ...config, // Preserve other existing properties if any (unlikely for empty object)
                    data: [{ ...defaultData }],
                });
                setValues([defaultData.max]); // Initialize values for the first item
            }
        }
    }, [question?.configJsonString, handleUpdateQuestion]); // Depend on configJsonString itself

    return (
        <div className="range-slider">
            {question?.configJsonString?.data?.length
                ? question.configJsonString.data.map((item, index) => {
                      return (
                          <Box
                              key={index}
                              className="range-slider-item flex flex-col gap-4 "
                          >
                              <Box className="flex flex-col items-center w-full">
                                  <Box className="flex justify-between w-full px-1 mb-2">
                                      <Typography variant="body2" color="white">
                                          {item.min}
                                      </Typography>
                                      <Typography
                                          variant="body2"
                                          color="white"
                                          sx={{
                                              flexGrow: 1,
                                              textAlign: "center",
                                          }}
                                      >
                                          {item.step}
                                      </Typography>
                                      <Typography variant="body2" color="white">
                                          {item.max}
                                      </Typography>
                                  </Box>
                                  <Slider
                                      value={values[index] ?? item.min}
                                      onChange={(_, value) =>
                                          handleSliderChange(
                                              value as number,
                                              index
                                          )
                                      }
                                      aria-labelledby={`range-slider-${index}`}
                                      valueLabelDisplay="auto"
                                      min={item.min}
                                      max={item.max}
                                      step={item.step}
                                      sx={{
                                          "& .MuiSlider-thumb": {
                                              width: 24,
                                              height: 24,
                                              "&:focus, &:hover, &.Mui-active":
                                                  {
                                                      boxShadow: "inherit",
                                                  },
                                          },
                                      }}
                                  />
                              </Box>

                              <Box className="flex justify-between gap-4">
                                  <Box>
                                      <Typography color="white" mb={2}>
                                          Min
                                      </Typography>
                                      <TextField
                                          type="number"
                                          value={item.min}
                                          onChange={(
                                              e: React.ChangeEvent<HTMLInputElement>
                                          ) =>
                                              handleRangeConfigChange(
                                                  index,
                                                  "min",
                                                  Number(e.target.value)
                                              )
                                          }
                                          InputLabelProps={{ shrink: true }}
                                          sx={{
                                              flexGrow: 1,
                                              backgroundColor: "white",
                                              borderRadius: 1,
                                          }}
                                      />
                                  </Box>
                                  <Box>
                                      <Typography color="white" mb={2}>
                                          Step
                                      </Typography>
                                      <TextField
                                          type="number"
                                          value={item.step}
                                          onChange={(
                                              e: React.ChangeEvent<HTMLInputElement>
                                          ) =>
                                              handleRangeConfigChange(
                                                  index,
                                                  "step",
                                                  Number(e.target.value)
                                              )
                                          }
                                          InputLabelProps={{ shrink: true }}
                                          sx={{
                                              flexGrow: 1,
                                              backgroundColor: "white",
                                              borderRadius: 1,
                                          }}
                                      />
                                  </Box>
                                  <Box>
                                      <Typography color="white" mb={2}>
                                          Max
                                      </Typography>
                                      <TextField
                                          type="number"
                                          value={item.max}
                                          onChange={(
                                              e: React.ChangeEvent<HTMLInputElement>
                                          ) =>
                                              handleRangeConfigChange(
                                                  index,
                                                  "max",
                                                  Number(e.target.value)
                                              )
                                          }
                                          InputLabelProps={{ shrink: true }}
                                          sx={{
                                              flexGrow: 1,
                                              backgroundColor: "white",
                                              borderRadius: 1,
                                          }}
                                      />
                                  </Box>
                                  <Box>
                                      <Typography color="white" mb={2}>
                                          Unit
                                      </Typography>
                                      <TextField
                                          value={item.unit}
                                          onChange={(
                                              e: React.ChangeEvent<HTMLInputElement>
                                          ) =>
                                              handleRangeConfigChange(
                                                  index,
                                                  "unit",
                                                  e.target.value
                                              )
                                          }
                                          InputLabelProps={{ shrink: true }}
                                          placeholder="Đơn vị"
                                          sx={{
                                              flexGrow: 1,
                                              backgroundColor: "white",
                                              borderRadius: 1,
                                          }}
                                      />
                                  </Box>
                              </Box>
                          </Box>
                      );
                  })
                : null}

            <Box className="add-range-button" onClick={handleAddRange}>
                <AddCircleIcon fontSize="small" />
                <Typography>Thêm mới</Typography>
            </Box>
        </div>
    );
};

export default RangeSlider;
