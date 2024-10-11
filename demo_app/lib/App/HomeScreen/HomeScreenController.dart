import 'package:get/get.dart';
import 'package:video_player/video_player.dart';

class HomeScreenController extends GetxController {
  final RxList<VideoPlayerController> videoControllers = <VideoPlayerController>[].obs;

  List<String> videoUrls = [
    'asset/videos/one.mp4',
    'asset/videos/two.mp4',
    'asset/videos/three.mp4',
  ];

  @override
  void onInit() {
    super.onInit();
    _initializeControllers();
  }

  @override
  void onClose() {
    for (var controller in videoControllers) {
      controller.dispose();
    }
    super.onClose();
  }

  void _initializeControllers() async {
    for (String url in videoUrls) {
      VideoPlayerController videoPlayerController = VideoPlayerController.asset(url);
      await videoPlayerController.initialize();
      videoPlayerController.setLooping(true);
      videoControllers.add(videoPlayerController);
    }

    if (videoControllers.isNotEmpty) {
      videoControllers.first.play();
    }
  }

  void playVideoAtIndex(int index) {
    // Pause all videos
    for (int i = 0; i < videoControllers.length; i++) {
      videoControllers[i].pause();
    }

    // Play the video at the selected index
    videoControllers[index].play();
  }

  void togglePlayPause(int index) {
    var videoController = videoControllers[index];
    if (videoController.value.isPlaying) {
      videoController.pause();
    } else {
      videoController.play();
    }

    // GetX will automatically track the changes, no need to manually refresh
    videoControllers[index] = videoController; // Assign back to trigger UI update
  }
}
