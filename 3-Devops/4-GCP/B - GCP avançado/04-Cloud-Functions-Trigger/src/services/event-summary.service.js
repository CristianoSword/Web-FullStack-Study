import { ProcessResultModel } from "../models/process-result.model.js";

export class EventSummaryService {
  constructor({ sampleEvent }) {
    this.sampleEvent = sampleEvent;
  }

  buildSummary() {
    return new ProcessResultModel({
      bucket: this.sampleEvent.data.bucket,
      objectName: this.sampleEvent.data.name,
      contentType: this.sampleEvent.data.contentType,
      size: Number(this.sampleEvent.data.size ?? 0)
    });
  }
}
