import { Topic } from '../models/topic.model';
import { ILesson, ITopic } from '../types';
import { Lesson } from '../models/lesson.model';

class TopicService {
  async createTopic(lessonId: string, data: { title: string; content: string }) {
    const topic = new Topic({ lessonId, ...data, quizzes: [] });
    await topic.save();
    await Lesson.findByIdAndUpdate(lessonId, { $push: { topics: topic._id } });
    return topic;
  }
  async updateTopic(topicId: string, data: Partial<ITopic>) {
    return await Topic.findByIdAndUpdate(topicId, data, { new: true });
  }
  async deleteTopic(topicId: string) {
    const topic = await Topic.findByIdAndDelete(topicId);
    if (topic) {
      await Lesson.findByIdAndUpdate(topic.lessonId, { $pull: { topics: topicId } });
    }
    return topic;
  }
  async getTopicsByLesson(lessonId: string) {
    return await Topic.find({ lessonId });
  }
  async getTopicById(topicId: string) {
    return await Topic.findById(topicId);
  }
}

export const topicService = new TopicService();