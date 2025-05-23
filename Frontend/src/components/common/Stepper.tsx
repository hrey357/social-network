import * as React from "react";
import { Timeline, Typography } from "@material-tailwind/react";
import { HomeSimple, UserCircle, Settings } from "iconoir-react";

export default function Stepper() {
  const [step, setStep] = React.useState(0);

  return (
    <div className="w-full mt-4">
      <Timeline
        mode="stepper"
        value={step}
        className="relative"
        onChange={(val: any) => setStep(Number(val))}
      >
        <Timeline.Item disabled={step < 0} value={'0'} className="w-full">
          <Timeline.Header>
            <Timeline.Separator className="translate-x-1/2" />
            <Timeline.Icon className="block mx-auto">
              <HomeSimple className="h-6 w-6" />
            </Timeline.Icon>
          </Timeline.Header>
          <Timeline.Body className="text-center">
            <Typography type="h6" color={step >= 0 ? "primary" : "inherit"}>
              Paso 1
            </Typography>
            <Typography type="small">Cliente.</Typography>
            
          </Timeline.Body>
        </Timeline.Item>
        <Timeline.Item value={'1'} disabled={step < 1} className="w-full">
          <Timeline.Header>
            <Timeline.Separator className="translate-x-1/2" />
            <Timeline.Icon className="mx-auto">
              <UserCircle className="h-6 w-6" />
            </Timeline.Icon>
          </Timeline.Header>
          <Timeline.Body className="text-center">
            <Typography type="h6" color={step >= 1 ? "primary" : "inherit"}>
              Paso 2
            </Typography>
            <Typography type="small">Mascota.</Typography>
          </Timeline.Body>
        </Timeline.Item>
        <Timeline.Item disabled={step < 2} value={'2'} className="w-full">
          <Timeline.Header>
            <Timeline.Icon className="mx-auto">
              <Settings className="h-6 w-6" />
            </Timeline.Icon>
          </Timeline.Header>
          <Timeline.Body className="text-center">
            <Typography type="h6" color={step >= 2 ? "primary" : "inherit"}>
              Paso 3
            </Typography>
            <Typography type="small">Servicio</Typography>
          </Timeline.Body>
        </Timeline.Item>
      </Timeline>

      {/* <div className="mt-14 flex w-full justify-between gap-4">
        <Button disabled={step === 0} onClick={() => setStep(step - 1)}>
          Previous
        </Button>
        <Button
          variant="solid"
          disabled={step === 2}
          onClick={() => setStep(step + 1)}
        >
          Next
        </Button>
      </div> */}
    </div>
  );
}
